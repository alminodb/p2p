import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const ChatLoading = () => {
    return (
        <>
            <Box mt={5} display="flex" justifyContent="space-between">
                <SkeletonCircle size='10' />
                <SkeletonText noOfLines={2} w="80%" style={{ display: "flex" }} flexWrap="wrap" alignItems="center" />
            </Box>
            <Box mt={5} display="flex" justifyContent="space-between">
                <SkeletonCircle size='10' />
                <SkeletonText noOfLines={2} w="80%" style={{ display: "flex" }} flexWrap="wrap" alignItems="center" />
            </Box>
            <Box mt={5} display="flex" justifyContent="space-between">
                <SkeletonCircle size='10' />
                <SkeletonText noOfLines={2} w="80%" style={{ display: "flex" }} flexWrap="wrap" alignItems="center" />
            </Box>
            <Box mt={5} display="flex" justifyContent="space-between">
                <SkeletonCircle size='10' />
                <SkeletonText noOfLines={2} w="80%" style={{ display: "flex" }} flexWrap="wrap" alignItems="center" />
            </Box>
            <Box mt={5} display="flex" justifyContent="space-between">
                <SkeletonCircle size='10' />
                <SkeletonText noOfLines={2} w="80%" style={{ display: "flex" }} flexWrap="wrap" alignItems="center" />
            </Box>
            <Box mt={5} display="flex" justifyContent="space-between">
                <SkeletonCircle size='10' />
                <SkeletonText noOfLines={2} w="80%" style={{ display: "flex" }} flexWrap="wrap" alignItems="center" />
            </Box>
        </>
    );
}

export default ChatLoading;