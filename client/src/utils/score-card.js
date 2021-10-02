import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    Chip
} from '@material-ui/core';

import MovieIcon from '@material-ui/icons//Movie';
import PersonIcon from '@material-ui/icons//Person';
import StarIcon from '@material-ui/icons/Star';

const ScoreCard = ({data}) => {
    return (
        <List className="scorecard">
            <ListItem>
                <ListItemAvatar>
                    <Avatar><StarIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Our score" secondary={data.score} className="rating" />
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
                <ListItemAvatar>
                    <Avatar><PersonIcon /></Avatar>
                </ListItemAvatar>
                <>
                    {
                        data.actors.map((actor, index) => (
                            <Chip
                                key={`${index}-${actor}`}
                                item={actor}
                                label={actor}
                                clickable
                                color="primary"
                                className="chip"
                            />
                        ))
                    }
                </>
            </ListItem>
            <Divider variant="inset" component="li" />

            <ListItem>
                <ListItemAvatar>
                    <Avatar><MovieIcon /></Avatar>
                </ListItemAvatar>
                <ListItemText primary="Director" secondary={data.director} />
            </ListItem>
        </List>
    );
};

export default ScoreCard;