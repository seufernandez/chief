import React from 'react';
import { CircularProgress, Box } from '@mui/material';
import MessageContainer from '../components/MessageContainer';

const withLoadingHOC = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const { isLoading, error, ...restProps } = props;

    if (isLoading) {
      return (
        <MessageContainer>
          <CircularProgress />
        </MessageContainer>
      );
    }

    if (error) {
      return (
        <MessageContainer>
          <Box>Error loading content</Box>
        </MessageContainer>
      );
    }

    return <WrappedComponent {...restProps} />;
  };
};

export default withLoadingHOC;
