import React, { useState } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface FiresListProps {
  numberOfMarkers: number;
  pointInfo?: { [key: string]: string }[];
}

const FiresList: React.FC<FiresListProps> = ({ numberOfMarkers, pointInfo }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    setExpanded(panel === "expand");
  };

  return (
    <Box sx={{ backgroundColor: "white", padding: "16px", borderRadius: "4px", mb: 2 }}>
      <Typography variant="h6">Fire Information</Typography>
      <Typography variant="body1">Number of Markers: {numberOfMarkers}</Typography>
      {pointInfo && (
        <Accordion expanded={expanded} onChange={handleChange}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
            <Typography variant="body1">Point Details</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {pointInfo.map((point, index) => (
              <div key={index}>
                <Typography variant="body2" fontWeight="bold">
                  {point.key}
                </Typography>
                <Typography variant="body2">{point.value}</Typography>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
};

export default FiresList;