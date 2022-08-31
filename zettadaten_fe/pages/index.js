import axios from "axios";
import Head from "next/head";
import * as React from "react";
//import * as Material from "@mui/material";
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
//import Container from "@mui/material";
import style from "../styles/Home.module.css";
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { Container } from "@mui/material";
import { useState, useEffect } from "react";

//import { style } from "@mui/system";

//function notificationsLabel(count) {
//if (count === 0) {
//return 'no notifications';
//}
//if (count > 99) {
//return 'more than 99 notifications';
//}
//return `${count} notifications`;
//}


/*
export default function Home({ pages }) {
  return (
    <div className={styles.container}>

      // <Head>
      //  <title>Create Next App</title>
      //  <link rel="icon" href="/favicon.ico" />
     // </Head>

      {pages &&
        pages.map(pages => (


          <Container key={pages.id}>
            <h2>{pages.Title}</h2>

          </Container>
        ))};
    </div>

  );
}

export async function getServerSideProps() {
  //const [posts, setPosts] = useState([]);
  const apiEndPoint = "http://localhost:1337/api/pages";
  const postRes = await axios.get("http://localhost:1337/api/pages");
  //const pages = await postRes.request();
  //axios.get(apiEndPoint).then(response => {
  //console.log(response.attributes);
  //});


  return {

    props: {

      pages: postRes.json().then((postres.attributes) => ({ postres.attributes })),
    },

  };
}
*/

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const Home = ({ Pages, error }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (error) {
    return <div classname={style.Container} >An error occured: {error.message}</div>;
  }
  return (
    <div className={style.main}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={style.main}>
        <h1 className={style.title}>
          Welcome to <a href="https://nextjs.org">
            Next.js!</a> integrated with{" "}
          <a href="https://mui.com/">Material-UI!</a>
        </h1>
        <p className={style.description}>
          Get started by editing{" "}
          <code className={style.code}>
            pages/index.js</code>
        </p>

      </main>

      <Stack
        direction="row"
        justifyContent="flex-left"
        alignItems="flex-start"
        padding="10px"
        spacing={3}
      >
        {Pages.data.map(Pages => (
          <div classname={style.main}>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={Pages.attributes.Title}
                subheader="September 14, 2016"
              />
              <CardMedia
                component="img"
                height="194"
                image={Pages.attributes.Images}
                alt="Paella dish"
              />
              <CardContent>

                <Typography variant="body1" color="text.secondary">
                  {Pages.attributes.Description}</Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>

                <Typography paragraph padding="10px">

                  {Pages.attributes.Content}</Typography>
              </Collapse>
            </Card>
          </div>

        ))} </Stack>
    </div>
  );
};

Home.getInitialProps = async ctx => {
  try {

    const res = await axios.get('http://localhost:1337/api/' + 'pages');
    const Pages = res.data;
    return { Pages };
  } catch (error) {
    return { error };
  }
};

export default Home;

