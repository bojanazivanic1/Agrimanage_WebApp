import Operation from "./Operation";
import { useEffect, useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { getOperationsOwner } from "../../services/userService";

const OperationList = ({ status }) => {
  const [operations, setOperations] = useState({
    planned: [],
    in_progress: [],
    completed: [],
  });

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // getOperationsOwner().then((res) => {
    //   const plannedOperations = res.filter(
    //     (operation) => operation.status === 0
    //   );
    //   const inProgressOperations = res.filter(
    //     (operation) => operation.status === 1
    //   );
    //   const completedOperations = res.filter(
    //     (operation) => operation.status === 2
    //   );

    //   setOperations({
    //     planned: plannedOperations,
    //     in_progress: inProgressOperations,
    //     completed: completedOperations,
    //   });
    // });
    onRefresh();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    getOperationsOwner().then((res) => {
      const plannedOperations = res.filter(
        (operation) => operation.status === 0
      );
      const inProgressOperations = res.filter(
        (operation) => operation.status === 1
      );
      const completedOperations = res.filter(
        (operation) => operation.status === 2
      );

      setOperations({
        planned: plannedOperations,
        in_progress: inProgressOperations,
        completed: completedOperations,
      });
    });
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {status === "0" &&
        operations.planned.map((operation) => (
          <Operation
            key={operation.id}
            id={operation.id}
            parcelName={operation.parcelName}
            parcelId={operation.parcelId}
            name={operation.name}
            description={operation.description}
            status={operation.status}
            onChange={onRefresh}
          />
        ))}
      {status === "1" &&
        operations.in_progress.map((operation) => (
          <Operation
            key={operation.id}
            id={operation.id}
            parcelName={operation.parcelName}
            parcelId={operation.parcelId}
            name={operation.name}
            description={operation.description}
            status={operation.status}
            onChange={onRefresh}
          />
        ))}
      {status === "2" &&
        operations.completed.map((operation) => (
          <Operation
            key={operation.id}
            id={operation.id}
            parcelName={operation.parcelName}
            parcelId={operation.parcelId}
            name={operation.name}
            description={operation.description}
            status={operation.status}
            onChange={onRefresh}
          />
        ))}
    </ScrollView>
  );
};

export default OperationList;
