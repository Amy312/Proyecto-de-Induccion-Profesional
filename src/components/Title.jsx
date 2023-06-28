import logo from "../assets/logo.svg";

const Title = () => {
  return (
    <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
      <img className="w-20 h-20 mr-2" src={logo} alt="logo" />
      AMY_IO
    </div>
  );
};
export default Title;
