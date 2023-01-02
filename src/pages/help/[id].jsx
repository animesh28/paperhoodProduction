import { AirplaneTicketRounded } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import DashboardLayout from "../../layouts/dashboard-layout";
import { DataContext } from "../../store/GlobalState";
import { patchData } from "../../server_utils/fetchData";
import { updateItem } from "../../store/Actions";
import { success, error } from "../../components/Notify";

function Ticket() {
  const [state, dispatch] = useContext(DataContext);
  const { tickets, auth, users } = state;
  const router = useRouter();

  const [ticketDetails, setTicketDetails] = useState([]);

  const handleRaise = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`help/raise/${order._id}`, null, auth.token).then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }

      const { status } = res.result;

      dispatch(
        updateItem(
          tickets,
          order._id,
          {
            ...order,
            status,
          },
          "ADD_TICKET"
        )
      );
      dispatch({ type: "NOTIFY", payload: { loading: false } });
      return success(res.msg);
    });
  };

  const handleResolve = (order) => {
    dispatch({ type: "NOTIFY", payload: { loading: true } });

    patchData(`help/resolve/${order._id}`, null, auth.token).then((res) => {
      if (res.err) {
        dispatch({ type: "NOTIFY", payload: { loading: false } });
        return error(res.err);
      }

      const { status } = res.result;

      dispatch(
        updateItem(
          tickets,
          order._id,
          {
            ...order,
            status,
          },
          "ADD_TICKET"
        )
      );
      dispatch({ type: "NOTIFY", payload: { loading: false } });
      return success(res.msg);
    });
  };

  useEffect(() => {
    if (tickets) {
      const newArr = tickets.filter((tick) => tick._id === router.query.id);

      setTicketDetails(newArr);
    }
  }, [tickets]);

  if (!auth.user) return null;
  return (
    <DashboardLayout>
      {ticketDetails &&
        ticketDetails.map((ticket) => (
          <div
            key={ticket._id}
            style={{ margin: "20px auto" }}
            className="row justify-content-around"
          >
            <div className="text-uppercase my-3" style={{ maxWidth: "700px" }}>
              <h3 className="text-break">ticket {ticket._id}</h3>

              <div className="mt-4">
                <p className="text-dark">Name: {ticket.user.name}</p>
                <p className="text-dark">Email: {ticket.user.email}</p>
                <p className="text-dark">Alternate Email: {ticket.email}</p>

                <div
                  className={`alert my-3 ${
                    ticket.status ? "alert-success" : "alert-danger"
                  }
                        d-flex justify-content-between align-items-center`}
                  role="alert"
                >
                  {ticket.status
                    ? `Resolved on ${ticket.updatedAt}`
                    : "Pending"}
                  {auth.user.role != "user" && !ticket.status ? (
                    <button
                      className="btn btn-dark text-uppercase "
                      onClick={() => handleResolve(ticket)}
                    >
                      Mark as resolved
                    </button>
                  ) : (
                    <button
                      className="btn btn-dark text-uppercase ml-20"
                      onClick={() => handleRaise(ticket)}
                    >
                      Re-raise ticket
                    </button>
                  )}
                </div>

                {ticket.issue && (
                  <p className="text-dark">
                    Issue Type: <em>{ticket.issue}</em>
                  </p>
                )}
                {ticket.description && (
                  <p className="text-dark">
                    Issue Description: <em>{ticket.description}</em>
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
    </DashboardLayout>
  );
}

export default Ticket;
