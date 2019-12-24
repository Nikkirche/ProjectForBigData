package com.template.states

import com.template.contracts.TemplateContract
import net.corda.core.contracts.BelongsToContract
import net.corda.core.contracts.ContractState
import net.corda.core.identity.AbstractParty
import net.corda.core.identity.Party

// *********
// * State *
// *********
@BelongsToContract(TemplateContract::class)
data class TemplateState(val appear: String,val appearance: Party, val administration:Party) : ContractState {
    override val participants get() = listOf(administration,appearance)
}
