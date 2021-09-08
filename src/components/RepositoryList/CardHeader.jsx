import React from "react";
import { View, Image, StyleSheet } from "react-native";

import Text from "../Text";

import theme from "../../theme";

const styles = StyleSheet.create({
  cardHeaderContainer: {
    flexDirection: "row",
  },
  cardAvatarContainer: {
    flexGrow: 0,
  },
  cardInfoContainer: {
    flexGrow: 1,
    flex: 1,
  },
  cardBadgeContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  cardAvatar: {
    width: 48,
    height: 48,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 4,
    marginRight: 12,
  },
  cardHeader: {
    borderBottomWidth: 2,
    borderBottomColor: theme.colors.backgroundSecondary,
  },
  cardDescription: {
    marginTop: 5,
  },
  cardBadge: {
    padding: 5,
    borderRadius: 5,
  },
});

const CardHeader = ({ repo }) => {
  const { fullName, description, language, ownerAvatarUrl } = repo;

  return (
    <View style={styles.cardHeaderContainer}>
      <View style={styles.cardAvatarContainer}>
        <Image
          style={styles.cardAvatar}
          source={{ uri: `${ownerAvatarUrl}` }}
        />
      </View>
      <View style={styles.cardInfoContainer}>
        <Text
          testID="repoName"
          style={styles.cardHeader}
          fontWeight="bold"
          fontSize="subheading"
        >
          {fullName}
        </Text>
        <Text style={styles.cardDescription}>{description}</Text>
        <View style={styles.cardBadgeContainer}>
          <Text
            testID="repoLanguage"
            style={styles.cardBadge}
            color="white"
            backgroundColor="primary"
          >
            {language}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CardHeader;
