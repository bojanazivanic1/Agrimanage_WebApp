import { useEffect, useState } from "react";
import { changeStatus, getOperationsOwner } from "../../services/userService";
import Operation from "./Operation";
import { Card } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Dashboard = () => {
  const [operations, setOperations] = useState({
    planned: [],
    in_progress: [],
    completed: [],
  });

  useEffect(() => {
    getOperationsOwner().then((res) => {
      if (res != null) {
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
      }
    });
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    const sourceColumnId = result.source.droppableId;
    const destinationColumnId = result.destination.droppableId;

    if (destinationColumnId != "completed" && sourceColumnId == "completed")
      return;
    if (destinationColumnId == "planned" && sourceColumnId == "in_progress")
      return;

    const movedOperation = operations[sourceColumnId][sourceIndex];

    if (destinationColumnId === "planned") {
      movedOperation.status = 0;
    } else if (destinationColumnId === "in_progress") {
      movedOperation.status = 1;
    } else if (destinationColumnId === "completed") {
      movedOperation.status = 2;
    }

    setOperations((prevOperations) => {
      const newOperations = { ...prevOperations };
      newOperations[sourceColumnId].splice(sourceIndex, 1);
      newOperations[destinationColumnId].splice(
        destinationIndex,
        0,
        movedOperation
      );
      return newOperations;
    });

    changeStatus({
      operationId: movedOperation.id,
      parcelId: movedOperation.parcelId,
      status: movedOperation.status,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "10px",
          marginTop: "50px",
          width: "100vw",
          height: "100vh",
        }}
      >
        <div>
          <h2>Planned</h2>
          <Droppable droppableId="planned">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div>
                  {operations.planned.map((operation, index) => (
                    <Draggable
                      key={operation.id}
                      draggableId={operation.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            sx={{
                              margin: "20px",
                            }}
                          >
                            <Operation
                              key={operation.id}
                              id={operation.id}
                              name={operation.name}
                              description={operation.description}
                              parcelId={operation.parcelId}
                              status={operation.status}
                            />
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div>
          <h2>In Progress</h2>
          <Droppable droppableId="in_progress">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div>
                  {operations.in_progress.map((operation, index) => (
                    <Draggable
                      key={operation.id}
                      draggableId={operation.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            sx={{
                              margin: "20px",
                            }}
                          >
                            <Operation
                              key={operation.id}
                              id={operation.id}
                              name={operation.name}
                              description={operation.description}
                              parcelId={operation.parcelId}
                              status={operation.status}
                            />
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div>
          <h2>Completed</h2>
          <Droppable droppableId="completed">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <div>
                  {operations.completed.map((operation, index) => (
                    <Draggable
                      key={operation.id}
                      draggableId={operation.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Card
                            sx={{
                              margin: "20px",
                            }}
                          >
                            <Operation
                              key={operation.id}
                              id={operation.id}
                              name={operation.name}
                              description={operation.description}
                              parcelId={operation.parcelId}
                              status={operation.status}
                            />
                          </Card>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Dashboard;
