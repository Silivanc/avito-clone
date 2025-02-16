import { FC } from "react";
import { useParams } from "react-router-dom";
import { Card, Image, Typography, Space } from "antd";
import defaultImage from "../assets/defaulImage.png";
import { useGetAdsQuery } from "../api/adsApi";

const { Title, Text } = Typography;

export const ItemPage: FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = useGetAdsQuery();

    const ad = data?.find((item) => item.id === Number(id));

    if (!ad) return <p className="text-center text-lg font-medium">Объявление не найдено</p>;

    const details = (() => {
        switch (ad.type) {
            case "Недвижимость":
                return [
                    { label: "Тип", value: ad.propertyType },
                    { label: "Площадь", value: `${ad.area} м²` },
                    { label: "Комнат", value: ad.rooms },
                    { label: "Цена", value: `${ad.price.toLocaleString()} ₽` },
                ];
            case "Авто":
                return [
                    { label: "Марка", value: ad.brand },
                    { label: "Модель", value: ad.model },
                    { label: "Год", value: ad.year },
                    { label: "Пробег", value: ad.mileage ? `${ad.mileage} км` : "Не указано" },
                ];
            case "Услуги":
                return [
                    { label: "Тип услуги", value: ad.serviceType },
                    { label: "Опыт", value: `${ad.experience} лет` },
                    { label: "Стоимость", value: `${ad.cost.toLocaleString()} ₽` },
                    { label: "График", value: ad.workSchedule || "Не указан" },
                ];
            default:
                return [];
        }
    })();

    return (
        <Card className="mx-full min-h-screen p-6 rounded-xl shadow-lg">
            <div className="flex flex-col gap-6 w-[65%] mx-auto">
                <div className="flex justify-center gap-3">
                <Image
                    width={600}
                    height={450}
                    src={ad.image || defaultImage}
                    alt={ad.name}
                    fallback={defaultImage}
                    preview={false}
                    placeholder={<Image preview={false} src={defaultImage} width={600} height={450} />}
                    className="rounded-lg object-cover object-center"
                />

                <div className="flex flex-col justify-between">
                    <Title level={1} className="font-bold text-gray-900 line-clamp-4">
                        {ad.name}
                    </Title>

                    <Space direction="vertical" size="middle">
                        {details.map(({ label, value }) => (
                            <Text key={label} className="text-gray-700 !text-2xl">
                                <span className="font-semibold text-blue-600">{label}:</span> {value}
                            </Text>
                        ))}
                    </Space>
                </div>
                </div>
                <Text className="mt-4 text-gray-600 text-sm leading-relaxed">{ad.description}</Text>
            </div>
        </Card>
    );
};
