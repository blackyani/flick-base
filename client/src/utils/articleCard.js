import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    Button
} from '@material-ui/core';

import FavoriteIcon from '@material-ui/icons/Favorite';

const ArticleCard = ({article}) => {
    const {title, content, _id: id} = article

    return (
        <Card>
            <CardMedia
                className="card_media"
                image={'https://picsum.photos/200/'}
                title={'Some title'}
            />
            <CardContent>
                <Typography gutterBottom variant="h5">
                    {title}
                </Typography>
                <Typography variant="body2" component="p">
                    {content}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton>
                    <FavoriteIcon/>
                </IconButton>
                <Button size="small" color="primary" component={RouterLink} to={`article/${id}`}>
                    View article
                </Button>
            </CardActions>
        </Card>
    );
};

export default ArticleCard;