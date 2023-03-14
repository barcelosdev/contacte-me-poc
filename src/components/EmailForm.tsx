import { Box, Text, FormControl, FormLabel, FormHelperText, Input, Textarea, Button, useToast } from "@chakra-ui/react"
import { EmailIcon } from "@chakra-ui/icons"
import { useEffect, useRef, useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

const serviceID = process.env.NEXT_PUBLIC_SERVICE_ID ?? '';
const templateID = process.env.NEXT_PUBLIC_TEMPLATE_ID ?? '';
const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY;

const EmailForm = () => {

  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSent, setFormSent] = useState(false);

  function sendEmail(e: FormEvent) {
    e.preventDefault();

    const params = {
      from_name: name,
      email: email,
      message: message
    }

    emailjs.send(serviceID, templateID, params, publicKey)
      .then(() => {

        toast({
          title: 'Legal!',
          description: "Seu e-mail foi enviado com sucesso!",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        setFormSent(true);
        formRef.current?.reset();
      })
  }

  useEffect(() => {
    if (formSent) {
      setName('');
      setEmail('');
      setMessage('');
      setFormSent(false);
    }
  }, [formSent]);

  return (
    <Box m="50px" width={{ base: '100%', lg: '40%', }}>
      <Box>
        <Text fontSize={30} fontWeight={700} mb={30}>
          Envie uma mensagem
        </Text>
      </Box>
      <form ref={formRef}>
        <FormControl isRequired={true}>
          <Box display="flex" alignItems={"flex-start"} justifyContent="space-between">
            <Box w={"45%"}>
              <FormLabel fontSize={14} fontWeight={700}>nome</FormLabel>
              <Input type="text" fontSize={14} placeholder={"Digite seu nome"} onChange={(e) => setName(e.target.value)} />
            </Box>
            <Box w={"45%"}>
              <FormLabel fontSize={14} fontWeight={700}>e-mail</FormLabel>
              <Input type="text" fontSize={14} placeholder="seuemail@mail.com" onChange={(e) => setEmail(e.target.value)} />
              <FormHelperText fontSize={12}>{"Não vamos compartilhar seu email."}</FormHelperText>
            </Box>
          </Box>
          <Box>
            <FormLabel fontSize={14} fontWeight={700}>mensagem</FormLabel>
            <Textarea
              placeholder='Deixe sua mensagem aqui.'
              fontSize={14}
              size='md'
              resize={'none'}
              height={'280px'}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Box>
          <Box
            mt={"30px"}
            display={'flex'}
            justifyContent={'flex-end'}
          >
            <Button
              leftIcon={<EmailIcon mr={3} />}
              colorScheme='teal'
              variant='solid'
              size={'lg'}
              onClick={sendEmail}
            >
              Enviar
            </Button>
          </Box>
        </FormControl>
      </form>
    </Box>
  )
}

export default EmailForm