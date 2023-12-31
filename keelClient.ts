// GENERATED DO NOT EDIT

type RequestHeaders = Record<string, string>;

export type RequestConfig = {
  baseUrl: string;
  headers?: RequestHeaders;
};

class Core {
	constructor(private config: RequestConfig) {}

	ctx = {
		token: "",
		isAuthenticated: false,
	};

	client = {
    setHeaders: (headers: RequestHeaders): Core => {
      this.config.headers = headers;
      return this;
    },
    setHeader: (key: string, value: string): Core => {
      const { headers } = this.config;
      if (headers) {
        headers[key] = value;
      } else {
        this.config.headers = { [key]: value };
      }
      return this;
    },
    setBaseUrl: (value: string): Core => {
      this.config.baseUrl = value;
      return this;
    },
    setToken: (value: string): Core => {
      this.ctx.token = value;
      this.ctx.isAuthenticated = true;
      return this;
    },
    clearToken: (): Core => {
      this.ctx.token = "";
      this.ctx.isAuthenticated = false;
      return this;
    },
    rawRequest: async <T>(action: string, body: any): Promise<APIResult<T>> => {
      try {
        const result = await globalThis.fetch(
          stripTrailingSlash(this.config.baseUrl) + "/json/" + action,
          {
            method: "POST",
            cache: "no-cache",
            headers: {
              accept: "application/json",
              "content-type": "application/json",
              ...this.config.headers,
              ...(this.ctx.token
                ? {
                    Authorization: "Bearer " + this.ctx.token,
                  }
                : {}),
            },
            body: JSON.stringify(body),
          }
        );

        if (result.status >= 200 && result.status < 299) {
          const rawJson = await result.text();
          const data = JSON.parse(rawJson, reviver);

          return {
            data,
          };
        }

        let errorMessage = "unknown error";

        try {
          const errorData: {
            message: string;
          } = await result.json();
          errorMessage = errorData.message;
        } catch (error) {}

        const requestId = result.headers.get("X-Amzn-Requestid") || undefined;

        const errorCommon = {
          message: errorMessage,
          requestId,
        };

        switch (result.status) {
          case 400:
            return {
              error: {
                ...errorCommon,
                type: "bad_request",
              },
            };
          case 401:
            return {
              error: {
                ...errorCommon,
                type: "unauthorized",
              },
            };
          case 403:
            return {
              error: {
                ...errorCommon,
                type: "forbidden",
              },
            };
          case 404:
            return {
              error: {
                ...errorCommon,
                type: "not_found",
              },
            };
          case 500:
            return {
              error: {
                ...errorCommon,
                type: "internal_server_error",
              },
            };

          default:
            return {
              error: {
                ...errorCommon,
                type: "unknown",
              },
            };
        }
      } catch (error) {
        return {
          error: {
            type: "unknown",
            message: "unknown error",
            error,
          },
        };
      }
    },
  };
}

// Utils

const stripTrailingSlash = (str: string) => {
  if (!str) return str;
  return str.endsWith("/") ? str.slice(0, -1) : str;
};


const RFC3339 = /^(?:\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01]))?(?:[T\s](?:[01]\d|2[0-3]):[0-5]\d(?::[0-5]\d)?(?:\.\d+)?(?:[Zz]|[+-](?:[01]\d|2[0-3]):?[0-5]\d)?)?$/;
function reviver(key: any, value: any) {
  // Convert any ISO8601/RFC3339 strings to dates
  if (typeof value === "string" && RFC3339.test(value)) {
	return new Date(value);
  }
  return value;
}



// Result type

export type APIResult<T> = Result<T, APIError>;

type Data<T> = {
  data: T;
  error?: never;
};

type Err<U> = {
  data?: never;
  error: U;
};

type Result<T, U> = NonNullable<Data<T> | Err<U>>;

// Error types

/* 400 */
type BadRequestError = {
  type: "bad_request";
  message: string;
  requestId?: string;
};

/* 401 */
type UnauthorizedError = {
  type: "unauthorized";
  message: string;
  requestId?: string;
};

/* 403 */
type ForbiddenError = {
  type: "forbidden";
  message: string;
  requestId?: string;
};

/* 404 */
type NotFoundError = {
  type: "not_found";
  message: string;
  requestId?: string;
};

/* 500 */
type InternalServerError = {
  type: "internal_server_error";
  message: string;
  requestId?: string;
};

/* Unhandled/unexpected errors */
type UnknownError = {
  type: "unknown";
  message: string;
  error?: unknown;
  requestId?: string;
};

export type APIError =
  | UnauthorizedError
  | ForbiddenError
  | NotFoundError
  | BadRequestError
  | InternalServerError
  | UnknownError;


// API

export class APIClient extends Core {
    constructor(config: RequestConfig) {
      super(config);
    }
    private actions = {
        book : (i: BookInput) => {
            return this.client.rawRequest<Book | null>("book", i);
        },
        allBooks : (i?: AllBooksInput) => {
            return this.client.rawRequest<{results: Book[], pageInfo: any}>("allBooks", i);
        },
        deleteBook : (i: DeleteBookInput) => {
            return this.client.rawRequest<string>("deleteBook", i);
        },
        updateBook : (i: UpdateBookInput) => {
            return this.client.rawRequest<Book>("updateBook", i);
        },
        createBook : (i: CreateBookInput) => {
            return this.client.rawRequest<Book>("createBook", i);
        },
        createWithMagic : (i: CreateWithMagicInput) => {
            return this.client.rawRequest<Book>("createWithMagic", i);
        },
        authenticate : (i: AuthenticateInput) => {
            return this.client.rawRequest<AuthenticateResponse>("authenticate", i).then((res) => {
              if (res.data && res.data.token) this.client.setToken(res.data.token);
              return res;
            });
        },
        requestPasswordReset : (i: RequestPasswordResetInput) => {
            return this.client.rawRequest<RequestPasswordResetResponse>("requestPasswordReset", i);
        },
        resetPassword : (i: ResetPasswordInput) => {
            return this.client.rawRequest<ResetPasswordResponse>("resetPassword", i);
        },
    };

    api = {
        queries: {
            book: this.actions.book.bind(this),
            allBooks: this.actions.allBooks.bind(this),
        },
        mutations: {
            deleteBook: this.actions.deleteBook.bind(this),
            updateBook: this.actions.updateBook.bind(this),
            createBook: this.actions.createBook.bind(this),
            createWithMagic: this.actions.createWithMagic.bind(this),
            authenticate: this.actions.authenticate.bind(this),
            requestPasswordReset: this.actions.requestPasswordReset.bind(this),
            resetPassword: this.actions.resetPassword.bind(this),
        }
    };

}

// API Types

export interface BookInput {
    id: string;
}
export interface AllBooksWhere {
}
export interface AllBooksInput {
    where?: AllBooksWhere;
    first?: number;
    after?: string;
    last?: number;
    before?: string;
}
export interface DeleteBookInput {
    id: string;
}
export interface UpdateBookWhere {
    id: string;
}
export interface UpdateBookValues {
    isbn?: string;
    author?: string | null;
    published?: Date | null;
    title?: string | null;
}
export interface UpdateBookInput {
    where: UpdateBookWhere;
    values?: UpdateBookValues;
}
export interface CreateBookInput {
    isbn: string;
    author?: string | null;
    published?: Date | null;
    title?: string | null;
}
export interface CreateWithMagicInput {
    isbn: string;
}
export interface EmailPasswordInput {
    email: string;
    password: string;
}
export interface AuthenticateInput {
    createIfNotExists?: boolean;
    emailPassword: EmailPasswordInput;
}
export interface AuthenticateResponse {
    identityCreated: boolean;
    token: string;
}
export interface RequestPasswordResetInput {
    email: string;
    redirectUrl: string;
}
export interface RequestPasswordResetResponse {
}
export interface ResetPasswordInput {
    token: string;
    password: string;
}
export interface ResetPasswordResponse {
}
export enum Gender {
    Male = "Male",
    Female = "Female",
    Nonbinary = "Nonbinary",
    Other = "Other",
}
export interface GenderWhereCondition {
    equals?: Gender | null;
    oneOf?: Gender[] | null;
}
export enum Region {
    Asia = "Asia",
    Americas = "Americas",
    Africa = "Africa",
    Mena = "Mena",
    Europe = "Europe",
    Poles = "Poles",
    Oceania = "Oceania",
}
export interface RegionWhereCondition {
    equals?: Region | null;
    oneOf?: Region[] | null;
}
export interface Book {
    isbn: string
    title: string | null
    author: string | null
    published: Date | null
    id: string
    createdAt: Date
    updatedAt: Date
    ownerId: string | null
}
export interface Identity {
    email: string | null
    emailVerified: boolean | null
    password: any | null
    externalId: string | null
    issuer: string | null
    id: string
    createdAt: Date
    updatedAt: Date
}
