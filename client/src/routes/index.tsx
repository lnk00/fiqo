import { client } from "@/lib/rpc";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/" as never)({
	component: RouteComponent,
});

function RouteComponent() {
	useEffect(() => {
		client.hello
			.$get()
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
			});
	}, []);

	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
		</div>
	);
}
