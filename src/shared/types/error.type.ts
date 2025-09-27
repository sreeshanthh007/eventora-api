

export interface TValidationIssue {
  message: string;
}

export interface TError extends Error{
    statusCode:number
      errors?: TValidationIssue[]; 
}