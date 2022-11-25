import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import * as Yup from 'yup'

import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  Stack,
  StackDivider,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import { useState } from 'react'
import ModelUI from './Model'

export type myObjectTypes = {
  onSubmit: any
}

const schema = Yup.object({
  name: Yup.string().required('enter your name'),
  surname: Yup.string().required('enter your surame'),
  email: Yup.string().email().required('email required'),
  age: Yup.number().positive().integer().min(15).required('enter your age'),
  password: Yup.string().min(6).max(10).required('password required'),
})

export const Form = () => {
  const [submitting, setSubmitting] = useState(false)
  const [modal, setModal] = useState<any>(null)

  const Submit = (event: any) => {
    event.preventDefault()
    setSubmitting(true)

    setTimeout(() => {
      setSubmitting(false)
    }, 1750)
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      age: 15,
      password: '',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = (data: any) => {
    onOpen()
    setModal(data)
    console.log(data)
  }

  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <div onSubmit={Submit}>
        <ModelUI isOpen={isOpen} onClose={onClose} data={modal} />
        <Stack divider={<StackDivider />}>
          <Text fontSize="5xl">
            <h1>Music-Static-Site</h1>
          </Text>
          {submitting && <div>Submtting Form...</div>}
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <FormControl>
                <Center>
                  <FormLabel>
                    <p>Name:</p>
                    <Input
                      type="text"
                      placeholder="name..."
                      {...register('name')}
                    />
                  </FormLabel>
                  <p>{errors.name?.message}</p>
                  <FormLabel>
                    <p>Surname:</p>
                    <Input
                      type="text"
                      placeholder="surname..."
                      {...register('surname')}
                    />
                  </FormLabel>
                  <p>{errors.surname?.message}</p>
                  <FormLabel>
                    <p>Email:</p>
                    <Input
                      type="text"
                      placeholder="email..."
                      {...register('email')}
                    />
                  </FormLabel>
                  <p>{errors.email?.message}</p>
                  <FormLabel>
                    <p>Age:</p>
                    <Input
                      type="number"
                      placeholder="age..."
                      {...register('age')}
                    />
                  </FormLabel>
                  <p>{errors.age?.message}</p>
                  <FormLabel>
                    <p>Password:</p>
                    <Input
                      type="text"
                      placeholder="password..."
                      {...register('password')}
                    />
                  </FormLabel>
                  <p>{errors.age?.message}</p>
                </Center>
              </FormControl>
            </fieldset>
            <div>
              <Button colorScheme="orange" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </Stack>
      </div>
    </>
  )
}