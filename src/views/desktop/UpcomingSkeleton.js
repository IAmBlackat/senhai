import { Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

export const UpcomingSkeleton = ({ classes }) => {
    return(
        <List className={classes.list} >
            <ListItem alignItems='flex-start'>
                <ListItemAvatar className={classes.imgContainer}>
                    <Skeleton variant='rect' className={classes.img} />
                </ListItemAvatar>
                <ListItemText 
                    primary={
                        <Typography noWrap component='span' className={classes.title} >
                            <Skeleton variant='text' height={30} />
                        </Typography>
                    }
                    secondary={
                        <Box component='span'>
                            <Box component='span' className={classes.genreContainer}>         
                                <Typography variant='body2' component='span' className={classes.genre}>
                                    <Skeleton variant='text' width={100} />
                                </Typography>                          
                            </Box>
                            <Box >
                                <Typography component='span' className={classes.synopsis}>
                                    <Skeleton variant='text' height={110} />
                                </Typography>
                            </Box>
                        </Box>
                    }
                />
            </ListItem>
        </List>
    )
}