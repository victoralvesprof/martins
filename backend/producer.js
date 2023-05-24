import amqp from "amqplib";
import config from "./src/config/config.js";

class Producer {
    channel;
    async createChannel() {
        const connection = await amqp.connect("amqp://guest:guest@localhost:5672");
        this.channel = await connection.createChannel();
    }

    async publishMessage(routingKey, message) {
        const logDetails = {
            logType: routingKey,
            message: message,
            dateTime: new Date(),
        };
        const exchangeName = config.rabbitMQ.exchangeName;

        if(!this.channel) await this.createChannel();

        await this.channel.assertExchange(exchangeName, "direct", {durable: false});
        console.log("exchange");

        await this.channel.publish(
            exchangeName, 
            routingKey,
            Buffer.from(JSON.stringify(logDetails))
        );
        console.log(`The message ${message} is sent to exchange ${exchangeName}`);
    }
}

export default Producer;