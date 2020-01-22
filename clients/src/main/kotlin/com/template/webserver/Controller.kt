package com.template.webserver

import org.slf4j.LoggerFactory
import org.springframework.http.MediaType.APPLICATION_JSON_VALUE
import org.springframework.web.bind.annotation.*

/**
 * Define your API endpoints here.
 */
@RestController
@RequestMapping("/") // The paths for HTTP requests are relative to this base path.
class Controller(rpc: NodeRPCConnection) {

    companion object {
        private val logger = LoggerFactory.getLogger(RestController::class.java)
    }

    private val proxy = rpc.proxy

    @GetMapping(value = ["/sendMessage"], produces = ["text/plain"])
    private fun templateendpoint(): String {
        print("We are good")
        return "Define an endpoint here."
    }

    @PostMapping("/postMessage", produces = ["text/plain"])
    private fun templatepoint(@RequestBody text: String) {
        print(text)
    }
}
