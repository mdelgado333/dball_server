import express from 'express'

module.exports = (app: any) => {
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  
      res.status(404).json({ errorMessage: "This route does not exist" });
    });
  
    app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
      console.error("ERROR", req.method, req.path, err);
  
      if (!res.headersSent) {
        res
          .status(500)
          .json({
            errorMessage: "Internal server error. Check the server console",
          });
      }
    });
  };