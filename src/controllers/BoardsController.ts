import { Request, Response } from 'express';
import db from "../database/connection";

export default class BoardsController {
  async index(request: Request, response: Response) {
    const sprint_id = request.params.sprintId;
    
    const boards = await db('boards')
      .where('boards.sprint_id', '=', sprint_id);

    const newBoard = boards.map(async board => {
      const tasksInBoards = await db('tasks')
        .where('tasks.board_id', '=', board.id);

      board.tasks = tasksInBoards;

      return board;
    });
    
    const result = await Promise.all(newBoard);
  
    return response.json(result);
  }

  async createBoard(request: Request, response: Response) {
    const {
      name,
      description
    } = request.body;
    const sprint_id = request.params.sprintId;
  
    try {
      await db('boards').insert({
        name,
        description,
        sprint_id
      });
    
      return response.status(201).send();
    } catch(error) {
      return response.status(400).json({
        error: 'Unexpected error while creating new board'
      });
    }
  }

  async updateBoard(request: Request, response: Response) {
    const {
      name,
      description
    } = request.body;
    const board_id = request.params.boardId;
  
    try {
      await db('boards').where('boards.id', '=', board_id).update({
        name,
        description,
      });
    
      return response.status(201).send();
    } catch(error) {
      return response.status(400).json({
        error: 'Unexpected error while update board'
      });
    }
  }

  async deleteBoard(request: Request, response: Response) {
    const board_id = request.params.boardId;
  
    try {
      await db('boards').where('boards.id', '=', board_id).delete();
    
      return response.status(201).send();

    } catch(error) {
      return response.status(400).json({
        error: 'Unexpected error while delete board'
      });
    }
  }
}