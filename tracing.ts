// adapted from:
// https://github.com/open-telemetry/opentelemetry-js/blob/main/getting-started/ts-example/README.md
// https://github.com/open-telemetry/opentelemetry-js/tree/main/packages/opentelemetry-exporter-collector-grpc
import { NodeTracerProvider } from "@opentelemetry/node";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { SimpleSpanProcessor } from "@opentelemetry/tracing";
import { CollectorTraceExporter } from "@opentelemetry/exporter-collector-grpc";

const provider: NodeTracerProvider = new NodeTracerProvider({});
const exporter = new CollectorTraceExporter();
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

provider.register();

registerInstrumentations({
  tracerProvider: provider,
  instrumentations: [new ExpressInstrumentation(), new HttpInstrumentation()],
});
