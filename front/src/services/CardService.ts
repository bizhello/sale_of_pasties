
import { ICard, ICardDto } from "../common/interfaces/card";
import api from "../configs/api";
import { ResCardDto, ResMessageCardDto } from "./dto/card.dto";

export default class CardService {
  public static async getCards(): Promise<ResCardDto> {

    const response: Response = await fetch(`http://localhost:5000/cards`, {
      method: 'GET',
      redirect: 'follow'
    })

    if (!response.ok) {
      return Promise.reject(response.json());
    }

    return response.json();
  }

  public static async incrementCard(idCard: string): Promise<ResMessageCardDto> {
    const response = await fetch(`${api.baseUrl}cards/${idCard}/increment`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      return Promise.reject(response.json());
    }

    return response.json();
  }

  public static async decrementCard(idCard: string): Promise<ResMessageCardDto> {
    const response = await fetch(`${api.baseUrl}cards/${idCard}/decrement`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      return Promise.reject(response.json());
    }

    return response.json();
  }

  public static async removeCard(idCard: string): Promise<ResMessageCardDto> {
    const response = await fetch(`${api.baseUrl}cards/${idCard}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      return Promise.reject(response.json());
    }

    return response.json();
  }

  public static async changeCard(card: ICard): Promise<ICard> {
    const { id, title, price, dateFrom, dateTo, count } = card;
    const response = await fetch(`${api.baseUrl}cards/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, price, dateFrom, dateTo, count })
    })

    if (!response.ok) {
      return Promise.reject(response.json());
    }

    return response.json();
  }

  public static async createCard(body: ICardDto): Promise<ICard> {
    const response = await fetch(`${api.baseUrl}cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "redirect": 'follow'
      },
      body: JSON.stringify(body)
    })

    if (!response.ok) {
      return Promise.reject(response.json());
    }

    return response.json();
  }

}