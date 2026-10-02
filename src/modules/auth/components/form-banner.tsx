import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type FormBannerProps = {
  message: string;
  tone?: 'error' | 'success';
};

export function FormBanner({ message, tone = 'error' }: FormBannerProps) {
  const theme = useTheme();
  const color = tone === 'error' ? 'danger' : 'primary';

  return (
    <ThemedView
      style={[styles.banner, { borderColor: theme[color] }]}
      accessibilityRole={tone === 'error' ? 'alert' : 'summary'}>
      <ThemedText type="small" themeColor={color}>
        {message}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderWidth: 1,
    borderRadius: Spacing.three,
    padding: Spacing.three,
  },
});
