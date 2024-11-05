import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';


// Определяем схему валидации с помощью zod
const lotSchema = z.object({
  createdUserId: z.number(), // ID пользователя, создающего запись
  userId: z.number(), // ID пользователя, создающего запись
  productTypeId: z.number(), // ID типа продукта
  price: z.number().positive(), // Положительная цена
  count: z.number().int().positive(), // Количество (целое положительное)
  delivery: z.string().min(1), // Информация о доставке
  doc: z.boolean(), // Наличие документации
  volume: z.number().positive(), // Объем
  packaging: z.enum(['BAG', 'BIGBAG']), // Тип фасовки
  decency: z.number().int().min(1).max(5), // Порядочность, например, от 1 до 5
});

// Определяем схему для массива объектов
const lotArraySchema = z.array(lotSchema);

export async function POST(req: NextRequest) {
  try {
    // Парсим и валидируем данные с помощью zod
    const body = await req.json();

    let validatedData;

    // Проверяем, является ли тело запроса массивом или объектом
    if (Array.isArray(body)) {
      validatedData = lotArraySchema.parse(body); // Валидация массива объектов
    } else {
      validatedData = lotSchema.parse(body); // Валидация одиночного объекта
    }

    // Если это массив, создаем записи с помощью createMany, иначе - создаем одиночную запись
    console.log(validatedData)
    const newLots = Array.isArray(validatedData)
      ? await prisma.lot.createMany({
          data: validatedData.map(lot => ({
            createdUserId: { connect: { id: lot.createdUserId } }, // Подключение к пользователю по ID
            productTypeId: lot.productTypeId,
            price: lot.price,
            count: lot.count,
            delivery: lot.delivery,
            doc: lot.doc,
            volume: lot.volume,
            packaging: lot.packaging,
            decency: lot.decency,
            userId: lot.userId
          })),
        })
      : await prisma.lot.create({
          data: {
            createdUserId: { connect: { id: validatedData.createdUserId } },
            productTypeId: validatedData.productTypeId,
            price: validatedData.price,
            count: validatedData.count,
            delivery: validatedData.delivery,
            doc: validatedData.doc,
            volume: validatedData.volume,
            packaging: validatedData.packaging,
            decency: validatedData.decency,
          },
        });

    // Возвращаем успешный ответ с созданными записями
    return NextResponse.json({ count: Array.isArray(validatedData) ? newLots.count : newLots }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Если ошибка валидации zod, возвращаем 400 и описание ошибок
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }

    console.error('Ошибка сервера:', error);
    // Возвращаем 500 для ошибок сервера
    return NextResponse.json({ error: 'Ошибка создания записи' }, { status: 500 });
  }
}