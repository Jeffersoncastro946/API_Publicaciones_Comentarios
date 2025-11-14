import {Router} from 'express';

const pubRouter = Router();

pubRouter.get('/', (req, res) => {
    res.send('publicaciones');
})

export default pubRouter;