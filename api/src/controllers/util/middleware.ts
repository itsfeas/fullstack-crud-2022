import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';

type middleware = (req: Request, res: Response, next: NextFunction) => void;
type errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => void;


/**
 *  Method capable of printing endpoint requests to console
 *  @returns request detail printing method
*/
function consoleDisplay(): middleware {
    return (req: Request, res: Response, next: NextFunction) => {
        console.log(`Request_Endpoint: ${req.method} ${req.url}`);
        next();
    };
};


/**
 *  Parses Request JSONs
 *  @returns express json parser
*/
function bodyParser(): middleware {
    return express.json();
};


/**
 *  Calls cors
 *  @returns cors
*/
function corsCall(): middleware {
    return cors();
};

/**
 *  Error Handling Middleware
 *  @returns Simple method capable of handling errors
*/
function errorHandler(): errorMiddleware {
    return (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error(err.stack);
        res.status(500).send('Something broke!');
    }
}

export default {
    consoleDisplay,
    bodyParser,
    corsCall,
    errorHandler
};