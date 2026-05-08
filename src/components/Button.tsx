

// ✅ PROPS TYPE
interface ButtonProps {
  value: string;
}

const Button = ({
  value,
}: ButtonProps) => {

  return (
    <div className="w-full bg-black flex flex-row justify-center items-center text-white text-md font-semibold rounded-xl py-3 cursor-pointer hover:bg-gray-800 transition">

      {value}

    </div>
  );
};

export default Button;