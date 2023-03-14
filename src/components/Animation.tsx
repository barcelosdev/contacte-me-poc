import { Box } from "@chakra-ui/react"
import Lottie from "lottie-react"
import animation from '../../public/assets/animations/contact-us-animation.json'

const Animation = () => {
  return (
    <Box width={'40%'} display={{ base: 'none', lg: 'flex' }} alignItems={'center'} justifyContent={'center'}>
      <Lottie
        animationData={animation}
        loop={true}
        style={{
          width: '500px'
        }}
      />
    </Box>
  )
}

export default Animation