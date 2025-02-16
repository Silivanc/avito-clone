import { FC } from "react";
import { Ad } from "../../types/ad.types";
import { useNavigate } from "react-router-dom";
import { Image } from "antd";
import defaultImage from "../../assets/defaulImage.png";
import { Button } from "../../ui/Button";

type AdComponentType = {
  ad: Ad;
};

export const AdComponent: FC<AdComponentType> = ({ ad }) => {
  const { id, name, description, location, type, image } = ad;
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-4 p-2 m-2 rounded-lg w-full mx-auto hover:bg-gray-200">
        <div className="w-56 h-52 flex-shrink-0">
          <Image
            width={224}
            height={208}
            src={image || undefined}
            alt={name}
            fallback={defaultImage}
            preview={false}
            placeholder={
              <Image
                preview={false}
                src={defaultImage}
                width={220}
                height={205}
              />
            }
            style={{
              objectFit: "cover",
              objectPosition: "center",
              borderRadius: "10px",
            }}
          />
        </div>

        <div className="relative w-full">
          <h2 className="text-blue-600 font-semibold text-2xl hover:text-red-600 line-clamp-1">
            {name}
          </h2>

          <p className="font-bold text-gray-900 text-lg">{type}</p>

          <p className="text-gray-600 text-md line-clamp-3">{description}</p>

          <div className="text-gray-500 text-xs mt-2 flex items-center gap-2">
            📍 {location}
          </div>

          <Button
            text="Открыть"
            fn={() => navigate("/item/" + id)}
            styles="bg-cyan-500 text-white h-8 w-full absolute bottom-0 hover:bg-cyan-600 "
          />
        </div>
      </div>
    </>
  );
};
