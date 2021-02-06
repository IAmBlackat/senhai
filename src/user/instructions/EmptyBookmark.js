import { Box, Button, Typography } from "@material-ui/core"
import { Link } from "react-router-dom"

export const EmptyBookmark = () => {
    return (
        <Box>
            <Typography variant='h4' style={{marginTop: "40px"}} >Your Bookmark is empty</Typography>
            <Typography variant='subtitle1' style={{marginTop: "20px"}} >You can add one by going to home and picking the anime you want to add</Typography>
            <Typography variant='subtitle1' style={{ opacity: 0.8 }} >Note: You can only do a bookmark on Details Page</Typography>
            <Button component={Link} to='/' style={{marginTop: "20px"}} size='large' variant='contained' color='primary' >Add Now</Button>
        </Box>
    )
}