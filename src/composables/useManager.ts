import { ref } from "vue";
import FormDrawer from "@/components/FormDrawer.vue"
import { changePassword } from "@/api/manager";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {  toast } from "@/composables/util"
import { showModel } from "@/composables/util";
import { logout } from "../api/manager";
export function useChangePassword() {
  const store = useStore();
  const router = useRouter();

  const formDrawerRef = ref<FormDrawer>();
  const form = ref({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const rules = ref({
    oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
    newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
    confirmPassword: [
      { required: true, message: "请确认新密码", trigger: "blur" },
    ],
  });
  const formRef = ref();
  formDrawerRef.value?.openDrawer();
  const onSubmit = () => {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        console.log(form.value);
        formDrawerRef.value?.showLoading();
        changePassword(form.value)
          .then(() => {
            toast("修改密码成功");
            store.dispatch("logout");
            router.push({ name: "login" });
          })
          .finally(() => {
            formDrawerRef.value?.hideLoading();
          })
          .catch((err: any) => {
            if (err.response.status === 500) {
              toast("服务器错误");
              store.dispatch("logout");
              router.push({ name: "login" });
            } else {
              toast("修改密码失败");
            }
          });
      } else {
        toast("请填写正确的密码");
      }
    });
  };
  const openChangePasswordDrawer = () => {
    formDrawerRef.value?.openDrawer();
  };
  return {
    formDrawerRef,
    formRef,
    form,
    rules,
    onSubmit,
    openChangePasswordDrawer,
  };
}

export function useLogout() {
  const store = useStore();
  const router = useRouter();
  const handleLogout = () => {
    showModel("确定退出登录吗？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      logout().finally(() => {
        store.dispatch("logout");
        router.push({ name: "login" });
        toast("退出登录成功");
      });
    }).catch(() => {
      toast("取消退出登录");
    });
  };
  return {
    handleLogout,
  };
}