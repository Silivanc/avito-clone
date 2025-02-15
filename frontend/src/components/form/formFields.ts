import { RegisterOptions } from "react-hook-form";
import { formFieldType } from "./form.type";

const positiveNumberRules: RegisterOptions = {
  min: {
    value: 1,
    message: `Введите положительное число`,
  },
}

const currentYear = new Date().getFullYear();
const yearRules: RegisterOptions = {
  min: {
    value: 1900,
    message: `Год не может быть меньше 1900`,
  },
  max: {
    value: currentYear,
    message: `Год не может быть больше текущего`,
  },
};

const experienceRules: RegisterOptions = {
  min: {
    value: 0,
    message: `Опыт не может быть меньше нуля`,
  },
  max: {
    value: 100,
    message: `Введите действительный опыт работы (в годах)`,
  },
};

export const generalFields: formFieldType[] = [
  {
    labelName: "Название",
    identificator: "name",
    spanError: "Введите название объявления",
  },
  {
    labelName: "Описание",
    identificator: "description",
    spanError: "Пожалуйста, заполните описание",
    component: "textarea",
  },
  {
    labelName: "Локация",
    identificator: "location",
    spanText: "Например, г. Москва, ул. Лесная, 7",
    spanError: "Обязательное поле",
  },
  {
    labelName: "Фото (ссылка, опционально)",
    identificator: "image",
    required: false,
  },
  {
    labelName: "Категория объявления",
    identificator: "type",
    spanText: "Выберите категорию из списка",
    spanError: "Пожалуйста, выберите категорию",
    component: "select",
    selectValues: {
      Недвижимость: "Недвижимость",
      Авто: "Авто",
      Услуги: "Услуги",
    },
  },
];

export const nedvizhimostFields: formFieldType[] = [
  {
    labelName: "Тип недвижимости",
    identificator: "propertyType",
    spanText: "Выберите тип из списка",
    spanError: "Пожалуйста, выберите тип из списка",
    component: "select",
    selectValues: {
      Квартира: "Квартира",
      ["Комната"]: "Комната",
      ["Дом, дача, коттедж"]: "Дом, дача, коттедж",
      ["Земельный участок"]: "Земельный участок",
      ["Гараж, машиноместо"]: "Гараж, машиноместо",
      ["Коммерческая недвижимость"]: "Коммерческая недвижимость",
    },
  },
  {
    labelName: "Площадь",
    identificator: "area",
    onNumber: "double",
    spanText: "кв. м",
    spanError: "Укажите площадь, кв. м",
    optionalRules: positiveNumberRules
  },
  {
    labelName: "Количество комнат",
    identificator: "rooms",
    onNumber: "integer",
    spanError: "Обязательное поле",
  },
  {
    labelName: "Цена",
    identificator: "price",
    onNumber: "integer",
    spanText: "Укажите цену, ₽",
    spanError: "Пожалуйста, укажите цену, ₽",
  },
];

export const transportFields: formFieldType[] = [
  {
    labelName: "Марка",
    identificator: "brand",
    spanText: "Выберите марку из списка или введите свою",
    spanError: "Укажите марку автомобиля",
    component: "select-input",
    selectValues: {
      ["Audi"]: "Audi",
      ["BMW"]: "BMW",
      ["Mercedes-Benz"]: "Mercedes-Benz",
      ["Toyota"]: "Toyota",
      ["Honda"]: "Honda",
      ["Ford"]: "Ford",
      ["Hyundai"]: "Hyundai",
      ["Nissan"]: "Nissan",
      ["Volkswagen"]: "Volkswagen",
      ["Lexus"]: "Lexus"
    },
  },  
  {
    labelName: "Модель",
    identificator: "model",
    spanError: "Укажите марку автомобиля",
  },
  {
    labelName: "Год выпуска",
    identificator: "year",
    onNumber: "integer",
    optionalRules: yearRules,
    spanError: "Укажите год выпуска",
  },
  {
    labelName: "Пробег (опционально)",
    required: false,
    identificator: "mileage",
    onNumber: "double",
    spanText: "Целое число, км",
  },
];

export const UslugiFields: formFieldType[] = [
  {
    labelName: "Тип услуги",
    identificator: "serviceType",
    spanText: "Выберите тип из списка или введите свой",
    spanError: "Пожалуйста, выберите тип из списка",
    component: "select-input",
    selectValues: {
      ['Уборка']: "Уборка",
      ["Доставка"]: "Доставка",
      ["Ремонт"]: "Ремонт",
      ["Помощь с учёбой"]: "Помощь с учёбой",
      ["Присмотр за детьми"]: "Присмотр за детьми"
    },
  },
  {
    labelName: "Опыт работы",
    identificator: "experience",
    spanText: "Введите количество целых лет",
    spanError: "Пожалуйста, укажите опыт работы (в годах)",
    onNumber: "integer",
    optionalRules: experienceRules,
  },
  {
    labelName: "Стоимость",
    identificator: "cost",
    spanText: "Укажите стоимость работы, ₽",
    spanError: "Укажите стоимость работы, ₽",
    onNumber: "integer",
  },
  {
    labelName: "График работы (опционально)",
    required: false,
    identificator: "workSchedule",
    spanText: "Например, ПН-ПТ, 08:00-19:00",
  },
]
