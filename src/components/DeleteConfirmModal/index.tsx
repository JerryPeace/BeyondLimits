import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  FormErrorMessage,
} from '@chakra-ui/react';
import { UserDataType } from '@@src/constants/user';

interface ModalProps {
  actions: IDisclosure;
  data: UserDataType;
  onSubmitDelete: () => void;
  isLoading: boolean;
}

interface IDisclosure {
  isOpen: boolean;
  onClose: () => void;
  onToggle?: () => void;
}

export default function DeleteConfirmModal({
  actions,
  data,
  onSubmitDelete,
  isLoading,
}: ModalProps) {
  const [isValidated, setValidated] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = () => {
    setValidated(true);
    if (inputRef.current?.value === 'DELETE') {
      onSubmitDelete();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const errorMsg =
    inputRef.current?.value === ''
      ? 'Field is required'
      : inputRef.current?.value !== 'DELETE'
        ? 'Invalid Value'
        : '';

  return (
    <>
      <Modal isOpen={actions.isOpen} onClose={actions.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deleteion</ModalHeader>
          {!isLoading && <ModalCloseButton />}
          <ModalBody pb={6}>
            Do you want remove the following user.
            <div style={{ margin: '8px 0', color: 'red' }}>{data.username}</div>
            Please type word DELETE in the text field below to confirm deletetion of this user.
            <FormControl isInvalid={!!errorMsg && isValidated}>
              <Input
                style={{ marginTop: 10 }}
                ref={inputRef}
                isDisabled={isLoading}
                placeholder="DELETE"
              />
              {isValidated && <FormErrorMessage>{errorMsg}</FormErrorMessage>}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              isLoading={isLoading}
              loadingText="Deleting"
              colorScheme="blue"
              mr={3}
              onClick={handleSubmit}
              variant="solid"
            >
              Delete
            </Button>
            <Button onClick={actions.onClose} isLoading={isLoading}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
