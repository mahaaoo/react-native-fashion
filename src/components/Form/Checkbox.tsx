import React from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { Box, Text } from '../Theme';
import { BorderlessButton } from 'react-native-gesture-handler';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }: CheckboxProps) => {
  console.log('s', checked);
  return (
    <BorderlessButton onPress={onChange} style={{ justifyContent: 'center' }}>
      <Box flexDirection="row">
        <Box 
          marginRight="m"
          height={20} 
          width={20} 
          justifyContent="center" 
          alignItems="center" 
          borderRadius="s"
          borderWidth={1}
          borderColor="primary"
          backgroundColor={checked ? 'primary' : 'background'}
        >
          <Icon name="check" color="background" />
        </Box>
        <Text variant="button">{label}</Text>
      </Box>
    </BorderlessButton>
  );
}

export default Checkbox;
