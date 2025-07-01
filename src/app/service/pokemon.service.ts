import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  // เพิ่ม import นี้
import { environment } from './environment';
import { PokemonCard } from './pokemon-card';

// เพิ่ม interface สำหรับ response ของ API
interface ApiResponse {
  cards: PokemonCard[];
}

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // แก้ method getCards() ให้ return Observable<ApiResponse>
  // หรือจะดึงเฉพาะ cards array ออกมาด้วย map operator ก็ได้
  getCards(): Observable<PokemonCard[]> {
    return this.http.get<ApiResponse>(this.apiUrl).pipe(
      map(response => response.cards)
    );
  }
}
