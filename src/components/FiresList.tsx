import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Pagination,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Fire } from "../lib/types";

interface FiresListProps {
  numberOfPoints: number;
  pointData: Fire[];
  pageSize: number;
}

const FiresList: React.FC<FiresListProps> = ({
  numberOfPoints,
  pointData,
  pageSize,
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(pointData?.length / pageSize) || 0;
  const currentPoints = pointData?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Box
      sx={{
        zIndex: 1000,
        position: "absolute",
        top: "30%",
        left: 10,
        backgroundColor: "white",
        padding: "16px",
        borderRadius: "4px",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6">Fire Information</Typography>
      <Typography variant="body1">
        Number of Points: {numberOfPoints}
      </Typography>
      {currentPoints?.length > 0 ? currentPoints.map((point, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index + 1}-content`}
            id={`panel${index + 1}-header`}
          >
            <Typography variant="body1">{`Point (${point.latitude}, ${point.longitude})`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {Object.entries(point).map(([key, value]) => (
              <div key={key}>
                <Typography variant="body2" fontWeight="bold">
                  {key}
                </Typography>
                <Typography variant="body2">{value}</Typography>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      )) : (
        <Typography variant="body1">There are no markers on the map.</Typography>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default FiresList;
