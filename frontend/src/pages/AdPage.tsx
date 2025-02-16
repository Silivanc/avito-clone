import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Image, Typography, Space } from "antd";
import defaultImage from "../assets/defaulImage.png";
import { useGetAdQuery } from "../api/adsApi";
import { Button } from "../ui/Button";
import { PATHS } from "../constants/constants";

const { Title, Text } = Typography;

export const ItemPage: FC = () => {
  const { id } = useParams();
  const { data: ad } = useGetAdQuery({ id: id ? Number(id) : -1 });
  const navigate = useNavigate();

  if (!ad)
    return (
      <p className="text-center text-lg font-medium">Объявление не найдено</p>
    );

  const details = (() => {
    switch (ad.type) {
      case "Недвижимость":
        return [
          { label: "Локация", value: ad.location },
          { label: "Тип", value: ad.propertyType },
          { label: "Площадь", value: `${ad.area} м²` },
          { label: "Комнат", value: ad.rooms },
          { label: "Цена", value: `${ad.price.toLocaleString()} ₽` },
        ];
      case "Авто":
        return [
          { label: "Локация", value: ad.location },
          { label: "Марка", value: ad.brand },
          { label: "Модель", value: ad.model },
          { label: "Год", value: ad.year },
          {
            label: "Пробег",
            value: ad.mileage ? `${ad.mileage} км` : "Не указано",
          },
        ];
      case "Услуги":
        return [
          { label: "Локация", value: ad.location },
          { label: "Тип услуги", value: ad.serviceType },
          { label: "Опыт", value: `${ad.experience} лет` },
          { label: "Стоимость", value: `${ad.cost.toLocaleString()} ₽` },
          { label: "График", value: ad.workSchedule || "Не указан" },
        ];
      default:
        return [];
    }
  })();

  const handleEdit = () => {
    navigate(PATHS.form, { state: id });
  };

  return (
    <Card className="w-full min-h-screen p-6 rounded-xl shadow-lg">
      <div className="flex flex-col gap-6 w-[65%] mx-auto">
        <div className="flex justify-center gap-3">
          <div>
            <Image
              width={545}
              height={450}
              src={ad.image || defaultImage}
              alt={ad.name}
              fallback={defaultImage}
              preview={false}
              placeholder={
                <Image
                  preview={false}
                  src={defaultImage}
                  width={545}
                  height={450}
                />
              }
              className="rounded-lg object-cover object-center"
            />
          </div>

          <div className="flex flex-col justify-between">
            <Title
              level={1}
              className="font-bold text-gray-900 line-clamp-3"
              title={ad.name}
            >
              {ad.name}
            </Title>

            <div>
              <Space direction="vertical" size="small" className="mb-5">
                {details.map(({ label, value }) => (
                  <Text key={label} className="text-gray-700 !text-2xl">
                    <span className="font-semibold text-blue-600">
                      {label}:
                    </span>{" "}
                    {value}
                  </Text>
                ))}
              </Space>

              <Button
                text="Редактировать"
                fn={handleEdit}
                styles="w-52 h-14 bg-[#f1f1f1] hover:bg-[#e5e4e4]"
              />
            </div>
          </div>
        </div>
        <Text className="mt-3 text-gray-600 text-sm leading-relaxed">
          {ad.description}
        </Text>
      </div>
    </Card>
  );
};
