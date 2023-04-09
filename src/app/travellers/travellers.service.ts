import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Travellers } from "../models/travellers";
import { environment } from "../../environments/environment";
import { from, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class TravellersService {
  httpOptions = {
    headers: new HttpHeaders({
      "Content-Type": "application/json",
    }),
  };

  constructor(public http: HttpClient) {}

  create(travelers): Observable<Travellers> {
    const headers = new HttpHeaders();
    if (
      !travelers["visitedCountries"] ||
      travelers["visitedCountries"].length == 0
    ) {
      travelers["visitedCountries"] = [];
    }

    let voyagers = {
      p_nom: travelers["firstname"],
      p_preNom: travelers["lastname"],
      p_sexe: travelers["sexe"],
      p_dateNaissance: travelers["birthdate"],
      p_paysNaissance: travelers["birthCountry"],
      p_villeNaissance: travelers["cityOfBirth"],
      p_nationalite: travelers["nationality"],
      p_passeportNumber: travelers["passportNumber"],
      p_email: travelers["email"],
      p_phone: travelers["phone"],
      p_etatCivil: travelers["etatCivil"],
      p_paysResidence: travelers["resident"],
      p_ville: travelers["street"],
      p_etat: travelers["city"],
      p_rue: travelers["addressResidence"],
      p_depart: travelers["departementId"],
      p_comm: travelers["communeId"],
      p_adresseHaiti: travelers["streetAddress"],
      // p_comm:travelers["communeId"].

      v_option: travelers["option"],
      v_typeVoyageId: travelers["travelTypeId"],
      v_dateVoyage: travelers["dateVoyage"],
      v_motifDeVoyage: travelers["travelMotif"],
      v_NumeroIdentificationDuDocument: travelers["numeroVisaOrPermis"],
      v_ligneAerienne: travelers["compagnyVoyage"],
      v_numeroDeVol: travelers["flightNumber"],
      v_transportType: travelers["typeGroundTranport"],
      v_numeroDeTranport: travelers["numeroTransport"],
      v_compagnieDeTransport: travelers["compagnyTransport"],
      v_plaque: travelers["plaque"],
      v_marque: travelers["marque"],
      v_specify: travelers["precision"],
      v_dureSejour: travelers["dureeSejour"],
      v_HotelDepartement: travelers["departementId_ArriverHaiti"],
      v_HotelCommune: travelers["communeId_ArriverHaiti"],
      v_HotelAdresse: travelers["streetAddress_ArriverHaiti"],

      s_dateSymtome: travelers["dateVaccination"],
      s_systomes: ["symptomes"],
      s_phome: travelers["phoneCovidSymptome"],
      s_ListeDesPaysVisite: travelers["visitedCountries"],
      s_isTestPcr: travelers["duree"],

      // d_declarationMoney: travelers["argentPossesion"],
      // d_declarationObject: travelers["douaneDeclaration"],

      // termCondition: travelers["terme"],
    };

    // headers.append('Access-Control-Allow-Origin: *', 'application/json');

    return this.http.post<any>(
      `${environment.apiUrl}` + "/auth/mict/form",
      voyagers,
      { headers }
    );
  }

  travellers(
    pageNumber: number,
    pageSize: number,
    query?: string
  ): Observable<any> {
    const currentPage = pageNumber - 1;

    const headers = new HttpHeaders();
    headers.append(
      "Authorization",
      "Bearer " + JSON.parse(localStorage.getItem("currentUser"))["accessToken"]
    );
    headers.append("Access-Control-Allow-Origin: *", "application/json");

    let params = new HttpParams();
    params = params.append("pageSize", pageSize.toString());
    params = params.append("pageNumber", currentPage.toString());

    let request;

    if (!query) {
      request = this.http.post<any>(
        `${environment.apiUrl}` + "/transactionList",
        {},
        { headers, params }
      );
    } else {
      params = params.append("query", query);
      request = this.http.post<any>(
        `${environment.apiUrl}` + "/transactionList",
        {},
        { headers, params }
      );
    }

    return request;
  }

  travellersDetails(id) {
    const headers = new HttpHeaders();
    headers.append(
      "Authorization",
      "Bearer " + JSON.parse(localStorage.getItem("currentUser"))["accessToken"]
    );
    headers.append("Access-Control-Allow-Origin: *", "application/json");
    return this.http.get<any>(
      `${environment.apiUrl}` + "/applicantDetails/" + id,
      {}
    );
  }

  testResult(id) {
    const headers = new HttpHeaders();
    headers.append(
      "Authorization",
      "Bearer " + JSON.parse(localStorage.getItem("currentUser"))["accessToken"]
    );
    // headers.append('Access-Control-Allow-Origin: *', 'application/json');
    headers.append("responseType:", "arraybuffer" as "json");
    return this.http.get<any>(`${environment.apiUrl}` + "/viewtestPCR/" + id, {
      headers,
    });
  }

  checkDocumentSerial(serial): Observable<boolean> {
    const headers = new HttpHeaders();
    const params = new HttpParams().set("numeroPiece", serial);
    return this.http.post<any>(
      `${environment.apiUrl}` + "/auth/checkNumeroPiece",
      {},
      { headers, params }
    );
  }

  updateAddress(communeId, departementId, documentSerial, streetAddress) {
    const headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin: *", "application/json");
    return this.http.post<any>(
      `${environment.apiUrl}` + "/auth/updateAddress",
      { communeId, departementId, documentSerial, streetAddress },
      { headers }
    );
  }

  accept(id: number, validate: boolean) {
    const headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin: *", "application/json");
    headers.append(
      "Authorization",
      "Bearer " + JSON.parse(localStorage.getItem("currentUser"))["accessToken"]
    );
    return this.http.get<any>(
      `${environment.apiUrl}` + "/accepter/" + id + "/" + validate,
      { headers }
    );
  }

  refuse(id: number, validate: boolean, reason: string) {
    const headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin: *", "application/json");
    headers.append(
      "Authorization",
      "Bearer " + JSON.parse(localStorage.getItem("currentUser"))["accessToken"]
    );
    return this.http.get<any>(
      `${environment.apiUrl}` + "/reject/" + id + "/" + validate + "/" + reason,
      { headers }
    );
  }

  identityPicture(id) {
    const headers = new HttpHeaders();
    headers.append(
      "Authorization",
      "Bearer " + JSON.parse(localStorage.getItem("currentUser"))["accessToken"]
    );
    headers.append("Access-Control-Allow-Origin: *", "application/json");
    // const params = new HttpParams().set('applicantId', id);
    return this.http.get<any>(`${environment.apiUrl}` + "/viewIdentity/" + id, {
      headers,
    });
  }

  temperature(id, temperature, mesure): Observable<any> {
    const headers = new HttpHeaders();
    headers.append(
      "Authorization",
      "Bearer " + JSON.parse(localStorage.getItem("currentUser"))["accessToken"]
    );
    headers.append("Access-Control-Allow-Origin: *", "application/json");
    const params = new HttpParams()
      .set("applicantId", id)
      .set("temperature", temperature)
      .set("temperatureType", mesure);
    return this.http.put<any>(
      `${environment.apiUrl}` + "/addTemperature",
      {},
      { headers, params }
    );
  }

  note(id, remarque): Observable<any> {
    const headers = new HttpHeaders();
    headers.append(
      "Authorization",
      "Bearer " + JSON.parse(localStorage.getItem("currentUser"))["accessToken"]
    );
    headers.append("Access-Control-Allow-Origin: *", "application/json");
    const params = new HttpParams()
      .set("applicantId", id)
      .set("remarque", remarque);
    return this.http.put<any>(
      `${environment.apiUrl}` + "/addRemarque",
      {},
      { headers, params }
    );
  }

  CreateTravellers(traveller): Observable<Travellers> {
    const headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin: *", "application/json");
    // return this.http.post(`${environment.apiUrl}` + '/saveApplicant', travellers, {headers});
    return this.http
      .post<Travellers>(
        `${environment.apiUrl}` + "/saveApplicant",
        JSON.stringify(traveller),
        this.httpOptions
      )
      .pipe(catchError(this.errorHandler));
  }

  sendOTP(email: string) {
    const headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin: *", "application/json");
    const params = new HttpParams().set("email", email);
    return this.http.post<any>(
      `${environment.apiUrl}` + "/auth/emailConfirm",
      {},
      { headers, params }
    );
  }

  checkOTP(otp): Observable<boolean> {
    const headers = new HttpHeaders();
    const params = new HttpParams().set("otp", otp);
    return this.http.post<any>(
      `${environment.apiUrl}` + "/auth/otp",
      {},
      { headers, params }
    );
  }

  errorHandler(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
