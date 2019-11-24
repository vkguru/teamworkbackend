import moment from 'moment';
import uuidv4 from 'uuid/v4';
import db from '../db';

const Articles = {
  /**
   * Create An Article
   * @param {object} req 
   * @param {object} res
   * @returns {object} article object 
   */
  async create(req, res) {
    const createQuery = `INSERT INTO
      articles(aid, title, body, author_id, date_created)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      uuidv4(),
      req.body.title,
      req.body.body,
      req.employees.eid,
      req.body.date_created,
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createQuery, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get All Articles
   * @param {object} req 
   * @param {object} res 
   * @returns {object} aeticles array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM articles where author_id = $1';
    try {
      const { rows, rowCount } = await db.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get An Article
   * @param {object} req 
   * @param {object} res
   * @returns {object} articles object
   */
  async getOne(req, res) {
    const text = 'SELECT * FROM articles WHERE aid = $1 AND author_id = $2';
    try {
      const { rows } = await db.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'article not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  /**
   * Update An Article
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated articles
   */
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM articles WHERE aid=$1 AND author_id = $2';
    const updateOneQuery =`UPDATE articles
      SET title=$1,body=$2,date_created=$3
      WHERE aid=$4 AND author_id =$5 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'comment not found'});
      }
      const values = [
        req.body.title || rows[0].title,
        req.body.body || rows[0].body,
        moment(new Date()),
        req.params.id,
        req.user.id
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },
  /**
   * Delete An Article
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return static code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM articles WHERE aid=$1 AND author_id = $2 returning *';
    try {
      const { rows } = await db.query(deleteQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'comment not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
 /**
   * Add Comment
   * @param {object} req 
   * @param {object} res
   * @returns {object} comments object 
   */
  async addComment(req, res) {
    const addCommentQuery = `INSERT INTO
      comments(cid, comment, author_id, date_created)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      uuidv4(),
      req.body.comment,
      req.gifs.gid,
      req.employees.eid,
      req.body.date_created,
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(addCommentQuery, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Delete A Comment
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return static code 204 
   */
  async deleteComment(req, res) {
    const deleteCommentQuery = 'DELETE FROM comments WHERE cid=$1 AND author_id = $2 returning *';
    try {
      const { rows } = await db.query(deleteCommentQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'comment not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Create A Gif
   * @param {object} req 
   * @param {object} res
   * @returns {object} gifs object 
   */
  async createGif(req, res) {
    const createGifQuery = `INSERT INTO
      gifs(gid, gif, author_id, date_created)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      uuidv4(),
      req.body.gif,
      req.employees.eid,
      req.body.date_created,
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(createGifQuery, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Add Comment
   * @param {object} req 
   * @param {object} res
   * @returns {object} comments object 
   */
  async addGifComment(req, res) {
    const addGifCommentQuery = `INSERT INTO
      comments(cid, comment, gif_id, author_id, date_created)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      uuidv4(),
      req.body.comment,
      req.gifs.gid,
      req.employees.eid,
      req.body.date_created,
      moment(new Date())
    ];

    try {
      const { rows } = await db.query(addGifCommentQuery, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Delete A Gif
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return static code 204 
   */
  async deleteGif(req, res) {
    const deleteGifQuery = 'DELETE FROM gifs WHERE gid=$1 AND author_id = $2 returning *';
    try {
      const { rows } = await db.query(deleteGifQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'Gif not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Articles;