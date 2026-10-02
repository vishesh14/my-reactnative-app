import { Pressable } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';

type AuthFooterLinkProps = {
  prompt: string;
  action: string;
  onPress: () => void;
};

export function AuthFooterLink({ prompt, action, onPress }: AuthFooterLinkProps) {
  return (
    <>
      <ThemedText type="small" themeColor="textSecondary">
        {prompt}
      </ThemedText>
      <Pressable hitSlop={Spacing.two} accessibilityRole="link" onPress={onPress}>
        <ThemedText type="smallBold" themeColor="primary">
          {action}
        </ThemedText>
      </Pressable>
    </>
  );
}
