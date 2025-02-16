import { useNavigate } from "react-router-dom";
import { Button } from "../../ui/Button";
import { PATHS } from "../../constants/constants";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="w-full h-screen p-5 flex flex-col items-center justify-center">
        <div className="flex max-w-[500px]">
          <svg
            width="395"
            height="150"
            viewBox="0 0 79 30"
            fill="currentColor"
          >
            <path d="M11.36.62 2 25.06h5.03l1.92-5.1h9.94l1.93 5.1h4.99L16.5.62h-5.15Zm-.68 14.85 3.27-8.6 3.25 8.6h-6.52Zm21.14 3.29L27.76 7.89h-4.8l6.54 17.17h4.75L40.69 7.9h-4.8l-4.06 10.87Zm14.9-10.87h-4.57v17.17h4.56V7.9Zm-2.3-1.24a3.33 3.33 0 1 0 0-6.65 3.33 3.33 0 0 0 0 6.65Zm11.34-3.34H51.2v4.55h-2.67V12h2.67v7.3c0 4.13 2.28 5.92 5.49 5.92a7.86 7.86 0 0 0 3.15-.62v-4.26c-.54.2-1.11.3-1.7.31-1.39 0-2.4-.54-2.4-2.4V12h4.1V7.9h-4.1V3.31Zm13.7 4.27a8.9 8.9 0 0 0-8.23 5.49 8.9 8.9 0 0 0 0 6.8 8.9 8.9 0 0 0 4.8 4.83 8.9 8.9 0 0 0 3.41.68 8.9 8.9 0 0 0 6.24-15.16 8.9 8.9 0 0 0-6.23-2.64Zm0 13.24a4.33 4.33 0 0 1-4.26-5.17 4.33 4.33 0 0 1 7.85-1.57 4.33 4.33 0 0 1 .73 2.41 4.32 4.32 0 0 1-4.33 4.32v.01Z"></path>
          </svg>
        </div>
        <div className="mb-5">Данный сайт является результатом выполнения тестового задания в Авито </div>
        <div>
            <Button
            text="Каталог объявлений"
            fn={() => navigate(PATHS.list)}
            styles="bg-black hover:bg-gray-700 h-14 w-54 text-white mr-3"
          ></Button>
          <Button
            text="Разместить объявление"
            fn={() => navigate(PATHS.form)}
            styles="bg-cyan-500 hover:bg-cyan-600 h-14 w-54 text-white"
          ></Button>
        </div>
    </main>
  );
};
