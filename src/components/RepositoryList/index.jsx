import React from "react";
import { FlatList, StyleSheet, View, TextInput } from "react-native";
import { useHistory } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useDebouncedCallback } from "use-debounce";

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
  search: {
    marginLeft: 20,
    marginTop: 20,
    marginRight: 20,
    padding: 10,
    backgroundColor: theme.colors.backgroundWhite,
    fontSize: theme.fontSizes.subheading,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: theme.colors.textPrimary,
  },
});

const SortingPicker = ({ queryVariables, setQueryVariables }) => {
  const [pickerValue, setPickerValue] = React.useState("latest");

  React.useEffect(() => {
    switch (pickerValue) {
      case "latest":
        setQueryVariables({
          ...queryVariables,
          orderBy: "CREATED_AT",
          orderDirection: "DESC",
        });
        break;
      case "highest":
        setQueryVariables({
          ...queryVariables,
          orderBy: "RATING_AVERAGE",
          orderDirection: "DESC",
        });
        break;
      case "lowest":
        setQueryVariables({
          ...queryVariables,
          orderBy: "RATING_AVERAGE",
          orderDirection: "ASC",
        });
        break;
      default:
        break;
    }
  }, [pickerValue]);

  return (
    <View style={styles.picker}>
      <Picker
        selectedValue={pickerValue}
        onValueChange={(itemValue) => setPickerValue(itemValue)}
      >
        <Picker.Item color="black" label="Latest repositories" value="latest" />
        <Picker.Item label="Highest rated repositories" value="highest" />
        <Picker.Item label="Lowest rated repositories" value="lowest" />
      </Picker>
    </View>
  );
};

const SearchField = ({ queryVariables, setQueryVariables }) => {
  const debounce = useDebouncedCallback((filter) => {
    setQueryVariables({ ...queryVariables, searchKeyword: filter });
  }, 400);

  return (
    <TextInput
      style={styles.search}
      onChangeText={(value) => debounce(value)}
      placeholder="Search"
    />
  );
};

const RepositoryListHeader = ({ queryVariables, setQueryVariables }) => {
  return (
    <View>
      <SearchField
        queryVariables={queryVariables}
        setQueryVariables={setQueryVariables}
      />
      <SortingPicker
        queryVariables={queryVariables}
        setQueryVariables={setQueryVariables}
      />
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  queryVariables,
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
          <RepositoryListHeader
            queryVariables={queryVariables}
            setQueryVariables={setQueryVariables}
          />
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
    orderBy: "CREATED_AT",
    orderDirection: "DESC",
  });

  // console.log(queryVariables);

  const { repositories } = useRepositories(queryVariables);

  return (
    <RepositoryListContainer
      repositories={repositories}
      queryVariables={queryVariables}
      setQueryVariables={setQueryVariables}
    />
  );
};

export default RepositoryList;
