import { useCookies } from '@vueuse/integrations/useCookies'
import { onMounted, ref, watch } from 'vue'
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'

export function useTabList() {
    const cookie = useCookies()

    function addTab(tab: any) {
        const index = editableTabs.value.findIndex(item => item.path === tab.path)
        if (index === -1) {
            editableTabs.value.push(tab)
        }
        cookie.set('editableTabs', editableTabs.value)
    }
    //初始化列表
    function initTabList() {
        let tabs = cookie.get('editableTabs')
        if (tabs) {
            editableTabs.value = tabs
        }
    }
    onMounted(() => {
        initTabList()
    })


    const router = useRouter()
    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path,
        })

    })
    const onChangeTab = (tab: string) => {
        activeTab.value = tab
        router.push(tab)
    }
    const store = useStore();
    const activeTab = ref(router.currentRoute.value.path)
    const editableTabs = ref([
        {
            name: "first",
            title: "后台首页",
            path: "/",
        }
    ]);

    const handleCommand = (command: string) => {
        if (command === 'closeAll') {
            activeTab.value = '/'
            editableTabs.value = [{
                name: "/",
                title: "后台首页",
                path: "/",
            }]
        } else if (command === 'closeOther') {
            editableTabs.value = editableTabs.value.filter(item => item.path === activeTab.value || item.path === '/')
        }
    }
    function removeTab(targetName: string) {
        editableTabs.value.forEach((item, index) => {
            if (item.path === targetName) {
                editableTabs.value.splice(index, 1);
                if (activeTab.value === targetName) {
                    activeTab.value = editableTabs.value[index - 1]?.path || editableTabs.value[index]?.path || '/'
                    onChangeTab(activeTab.value)
                }
            }
            cookie.set('editableTabs', editableTabs.value)
        });
    }
    var asideWidth = ref(store.state.asideWidth)
    watch(() => store.state.asideWidth, (newVal, oldVal) => {
        asideWidth.value = newVal
    })

    return {
        activeTab,
        editableTabs,
        handleCommand,
        removeTab,
        onChangeTab,
        asideWidth,
    }
}