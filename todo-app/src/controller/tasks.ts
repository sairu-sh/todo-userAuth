import { Request, Response } from "express";
import * as taskServices from "../service/tasks";

export const getAll = (req: Request, res: Response) => {
  const data = taskServices.getAll();
  res.send(data);
};

type CreateTaskParams = {
  title: string;
  description?: string;
};

export const createTask = (req: Request, res: Response) => {
  const { title, description = "" }: CreateTaskParams = req.body;
  const status = taskServices.createTask({ title, description });
  if (status) res.sendStatus(201);
  else res.sendStatus(500);
};

export const getCompleted = (req: Request, res: Response) => {
  const data = taskServices.getCompleted();
  res.send(data);
};

export const getRemaining = (req: Request, res: Response) => {
  const data = taskServices.getRemaining();
  res.send(data);
};

export const toggleCompleted = (req: Request, res: Response) => {
  console.log("hi");
  console.log(req.query.id);
  const data = taskServices.toggleCompleted(req.query.id as string);
  res.send(data);
};

export const deleteTask = (req: Request, res: Response) => {
  const status = taskServices.deleteTask(req.query.id as string);
  if (status) res.sendStatus(204);
  else res.sendStatus(500);
};
