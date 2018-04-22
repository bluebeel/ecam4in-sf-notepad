import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { MessageService } from './message.service';
import { Category } from './category';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoryService {

  private categoriesUrl = 'http://localhost:8000/api/category';  // URL to web api

  // Placeholder for notes
  categories: Category[] = [];

  constructor(private http: HttpClient, private messageService: MessageService) {}

  /** Log a CategoryService message with the MessageService */
  private log(message: string) {
    this.messageService.add('CategoryService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // POST create a new category on the server
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.categoriesUrl, category, httpOptions)
      .pipe(
        tap((category: Category) => this.log(`added category w/ id=${category.id}`)),
        catchError(this.handleError<Category>('addCategory'))
      );
  }

  // DELETE category by id from the server
  deleteCategoryById(category: Category | number): Observable<Category> {
    const id = typeof category === 'number' ? category : category.id;
    const url = `${this.categoriesUrl}/${id}`;

    return this.http.delete<Category>(url, httpOptions)
      .pipe(
        tap(_ => this.log(`deleted category id=${id}`)),
        catchError(this.handleError<Category>('deleteCategoryById'))
      );
  }

  // PUT update the category on the server
  updateCategoryById(id: number, category: Category): Observable<any> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.put(url, category, httpOptions).pipe(
      tap(_ => this.log(`updated category id=${category.id}`)),
      catchError(this.handleError<any>('updateCategoryById'))
    );
  }

  // GET all the categories from the server
  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
      .pipe(
        tap(_ => this.log(`fetched categories`)),
        catchError(this.handleError('getAllCategories', []))
      );
  }

  // GET category by id. Will 404 if id not found
  getCategoryById(id: number): Observable<Category> {
    const url = `${this.categoriesUrl}/${id}`;
    return this.http.get<Category>(url)
      .pipe(
        tap(_ => this.log(`fetched category id=${id}`)),
        catchError(this.handleError<Category>(`getCategoryById id=${id}`))
      );
  }

}
