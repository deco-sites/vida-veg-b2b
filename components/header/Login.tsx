import Icon from "../ui/Icon.tsx";

const Login = () => {
  return (
    <a class="text-primary lg:text-accent flex items-center gap-1 py-6 px-4 lg:px-0 lg:py-0 ">
      <Icon id="new-login" width={32} height={32} />
      <span class="w-full text-base max-w-[129px] lg:max-w-[89px] lg:text-xs">
        Faça seu <strong class="font-semibold">login</strong> ou{" "}
        <strong class="font-semibold">cadastre-se</strong>
      </span>
    </a>
  );
};

export default Login;
