import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import PhoneIcon from "@material-ui/icons/Phone";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";
export const PlaceDetails = ({
  place: {
    name,
    photo,
    price,
    ranking,
    awards,
    cuisine,
    address,
    phone,
    web_url,
    website,
    num_reviews,
    rating,
  },
  selected,
  refProp,
}) => {
  const { chip, subtitle, spacing } = useStyles();

  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          photo
            ? photo.images.large.url
            : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
        }
        title={name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {name}
        </Typography>
        {rating && (
          <Box display="flex" justifyContent="space-between">
            <Rating value={Number(rating)} />
            <Typography gutterBottom variant="subtitle1">
              out of {num_reviews} reviews
            </Typography>
          </Box>
        )}
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Price</Typography>
          <Typography gutterBottom variant="subtitle1">
            {price}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1">Ranking</Typography>
          <Typography gutterBottom variant="subtitle1">
            {ranking}
          </Typography>
        </Box>
        {awards?.map(({ images, display_name }, idx) => (
          <Box
            key={idx}
            my={1}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <img src={images.small} alt={display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {display_name}
            </Typography>
          </Box>
        ))}
        {cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={chip} />
        ))}
        {address && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={subtitle}
          >
            <LocationOnIcon /> {address}
          </Typography>
        )}
        {phone && (
          <Typography
            gutterBottom
            variant="subtitle2"
            color="textSecondary"
            className={spacing}
          >
            <PhoneIcon /> {phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(web_url, "_blank")}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};
