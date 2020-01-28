package com.template.webserver


import com.google.gson.GsonBuilder
import com.template.flows.Initiator
import com.template.states.TemplateState
import net.corda.core.identity.CordaX500Name
import net.corda.core.identity.Party
import net.corda.core.messaging.startFlow
import net.corda.core.messaging.vaultQueryBy
import net.corda.core.utilities.getOrThrow
import org.slf4j.LoggerFactory
import org.springframework.ui.Model
import org.springframework.web.bind.annotation.*


/**
 * Define your API endpoints here.
 */
@RestController
@RequestMapping("/") // The paths for HTTP requests are relative to this base path.
@CrossOrigin(origins = arrayOf("*"), allowCredentials = "true")

class Controller(rpc: NodeRPCConnection) {
    class Statements(
            val administration: String,
            //val field: String,
            //val subfield: String,
            val appear: String
    ) {
        override fun toString(): String {
            return "Category [Administration: ${this.administration}, + Appear: ${this.appear} "
                    //Field:${this.field}, + SubField: ${this.subfield} ]"
        }
    }

    companion object {
        private val logger = LoggerFactory.getLogger(RestController::class.java)
    }

    private val proxy = rpc.proxy

    @GetMapping("/greeting")
    fun greeting(@RequestParam(name = "name", required = false, defaultValue = "World") name: String?, model: Model): String? {
        model.addAttribute("name", name)
        return "templates/greeting.html"
    }

    @GetMapping(value = ["/getData"], produces = ["text/plain"])
    private fun getData(): String {
        val data: List<Statements> = proxy.vaultQueryBy<TemplateState>().states.map {
            Statements(
                    (it.state.data.appear.substringBefore("requestText").substringAfter("district\\u003d")),it.state.data.appear.substringAfter("requestText\\u003d"))
            //substringBefore('.').substringAfter('#'),
            //,it.state.data.appearance.toString(), it.state.data.appear//.substringAfter("&requestText="))
        }
        val gson = GsonBuilder().setPrettyPrinting().create()
        val dataResult: String = gson.toJson(data)
        println(dataResult)

        return dataResult
    }

    @PostMapping(value = ["/postData"], produces = ["text/plain"])
    private fun postData(@RequestBody text: String) {
        val administration = CordaX500Name.parse("O=PartyB,L=New York,C=US")
        println(text)
        val party: Party = proxy.wellKnownPartyFromX500Name(administration)!!
        proxy.startFlow(::Initiator, text, party).returnValue.getOrThrow()
    }
}
