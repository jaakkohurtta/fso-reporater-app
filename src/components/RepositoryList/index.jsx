import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useHistory } from "react-router-native";
import { Picker } from "@react-native-picker/picker";

import RepositoryCard from "./RepositoryCard";
import Separator from "../Separator";

import useRepositories from "../../hooks/useRepositories";

import theme from "../../theme";

const styles = StyleSheet.create({
  separator: {
    height: 8,
  },
  container: {
    flexShrink: 1,
    flexGrow: 1,
  },
  picker: {
    padding: 20,
    backgroundColor: theme.colors.backgroundSecondary,
    fontSize: theme.fontSizes.subheading,
  },
});

const SortingPicker = ({ setQueryVariables }) => {
  const [pickerValue, setPickerValue] = React.useState("latest");

  React.useEffect(() => {
    switch (pickerValue) {
      case "latest":
        setQueryVariables({ orderBy: "CREATED_AT", orderDirection: "DESC" });
        break;
      case "highest":
        setQueryVariables({
          orderBy: "RATING_AVERAGE",
          orderDirection: "DESC",
        });
        break;
      case "lowest":
        setQueryVariables({ orderBy: "RATING_AVERAGE", orderDirection: "ASC" });
        break;
      default:
        break;
    }
  }, [pickerValue]);
  return (
    <View>
      <Picker
        selectedValue={pickerValue}
        onValueChange={(itemValue) => setPickerValue(itemValue)}
        style={styles.picker}
      >
        <Picker.Item color="black" label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  setQueryVariables,
}) => {
  const history = useHistory();

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  const handlePress = (id) => {
    history.push(`/${id}`);
  };

  return (
    <View testID="repoList" style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <SortingPicker setQueryVariables={setQueryVariables} />
        }
        data={repositoryNodes}
        renderItem={({ item }) => (
          <RepositoryCard
            key={item.id}
            repository={item}
            onPress={() => handlePress(item.id)}
          />
        )}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

const RepositoryList = () => {
  const [queryVariables, setQueryVariables] = React.useState({
    orderBy: 0,
    orderDirection: 1,
  });

  const { repositories, refetch } = useRepositories(queryVariables);

  React.useEffect(() => {
    refetch();
  }, [queryVariables]);

  return (
    <RepositoryListContainer
      repositories={repositories}
      setQueryVariables={setQueryVariables}
    />
  );
};

export default RepositoryList;
