import { Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type PasswordToggleProps = {
  visible: boolean;
  onToggle: () => void;
};

export function PasswordToggle({ visible, onToggle }: PasswordToggleProps) {
  return (
    <Pressable
      onPress={onToggle}
      hitSlop={Spacing.two}
      accessibilityRole="button"
      accessibilityLabel={visible ? 'Hide password' : 'Show password'}>
      <ThemedText type="smallBold" themeColor="primary">
        {visible ? 'Hide' : 'Show'}
      </ThemedText>
    </Pressable>
  );
}
