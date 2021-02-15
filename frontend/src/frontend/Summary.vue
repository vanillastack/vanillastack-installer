<template>
    <div class="container-fluid">
        <div class="row margin-2em">
            <div class="col">
                <h3>Summary</h3>
            </div>
        </div>
        <div class="row margin-2em">
            <div class="col">
                <p>This is the summary of all the settings you have been selected, choosen and entered. Please check them
                carefully, and after you agreed with them, press the <em>Install VanillaStack!</em>-button, to start 
                the installation.</p>
                <p>Note: You can directly jump to the settings page for each section by hitting the <em>Edit</em>-button next to the secion's name.</p> 
            </div>
        </div>
        <div id="accordion" class="margin-2em form">
            <div class="card margin-1em">
                <div class="card-header" id="generalHeading">
                    <div class="row">
                        <div class="col">
                            <h5 class="mb-0">
                                <button class="btn btn-link accordion-link" data-toggle="collapse" data-target="#generalData" 
                                    aria-expanded="true" aria-controls="generalData">
                                    General Settings
                                </button>
                            </h5>
                        </div>
                        <div class="col-1">
                            <router-link to="/general" class="summaryLink">Edit</router-link>
                        </div>
                    </div>
                </div>

                <div id="generalData" class="collapse show" aria-labelledby="generalHeading" 
                    data-parent="#accordion">
                    <div class="card-body">
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">HA</div>
                            <div class="col-2">
                                <i v-if="general.isHA" class="fas fa-check-circle green"></i>
                                <i v-if="!general.isHA" class="fas fa-times-circle red"></i>
                            </div>
                            <div class="col-2 offset-md-2 text-align-right padding-right-1em">Rook</div>
                            <div class="col-2">
                                <i v-if="general.installRook" class="fas fa-check-circle green"></i>
                                <i v-if="!general.installRook" class="fas fa-times-circle red"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Cluster -->
            <div class="card margin-1em">
                <div class="card-header" id="cluster">
                    <div class="row">
                        <div class="col">
                            <h5 class="mb-0">
                                <button class="btn btn-link accordion-link" data-toggle="collapse" data-target="#clusterData" 
                                    aria-expanded="false" aria-controls="clusterData">
                                    Cluster-Settings
                                </button>
                            </h5>
                        </div>
                        <div class="col-1">
                            <router-link to="/cluster" class="summaryLink">Edit</router-link>
                        </div>
                    </div>
                </div>

                <div id="clusterData" class="collapse" aria-labelledby="cluster" 
                    data-parent="#accordion">
                    <div class="card-body">
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">Pod CIDR</div>
                            <div class="col-2">{{ cluster.pod_cidr }}</div>
                            <div class="col-2 offset-md-2 text-align-right padding-right-1em">Service CIDR</div>
                            <div class="col-2">{{ cluster.service_cidr }}</div>
                        </div>
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">Use external LoadBalancer</div>
                            <div class="col-2">
                                <i v-if="cluster.useExternalLb" class="fas fa-check-circle green"></i>
                                <i v-if="!cluster.useExternalLb" class="fas fa-times-circle red"></i>
                            </div>
                            <div class="col-2 offset-md-2 text-align-right padding-right-1em">
                                <span v-if="cluster.useExternalLb">Hostname / IP of the external LoadBalancer</span>
                                <span v-if="!cluster.useExternalLb">IP of the clusterCluster</span>
                            </div>
                            <div class="col-2">
                                <span v-if="cluster.useExternalLb">{{ cluster.externalLbIp }}</span>
                                <span v-if="!cluster.useExternalLb">{{ cluster.ip }}</span>
                            </div>
                        </div>
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">Use Cluster Domain-Name</div>
                            <div class="col-2">
                                <i v-if="cluster.usefqdn" class="fas fa-check-circle green"></i>
                                <i v-if="!cluster.usefqdn" class="fas fa-times-circle red"></i>
                            </div>
                            <div class="col-2 offset-md-2 text-align-right padding-right-1em">
                                <span v-if="cluster.usefqdn">Cluster Domain-Name</span>
                                <span v-if="!cluster.usefqdn"></span>
                            </div>
                            <div class="col-2">
                                <span v-if="cluster.usefqdn">{{ cluster.fqdn }}</span>
                            </div>
                        </div>
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">Use Domain for VanillaStore</div>
                            <div class="col-2">
                                <i v-if="cluster.useadminfqdn" class="fas fa-check-circle green"></i>
                                <i v-if="!cluster.useadminfqdn" class="fas fa-times-circle red"></i>
                            </div>
                            <div class="col-2 offset-md-2 text-align-right padding-right-1em">
                                <span v-if="cluster.useadminfqdn">VanillaStore Endpoint</span>
                                <span v-if="!cluster.useadminfqdn"></span>
                            </div>
                            <div class="col-2">
                                <span v-if="cluster.useadminfqdn">{{ cluster.adminfqdn }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /cluster -->

            <!-- letsencrypt -->
            <div class="card margin-1em">
                <div class="card-header" id="letsencrypt">
                    <div class="row">
                        <div class="col">
                            <h5 class="mb-0">
                                <button class="btn btn-link accordion-link" data-toggle="collapse" data-target="#letsencryptData" 
                                    aria-expanded="false" aria-controls="letsencryptData">
                                    Let's Encrypt
                                </button>
                            </h5>
                        </div>
                        <div class="col-1">
                            <router-link to="/letsencrypt" class="summaryLink">Edit</router-link>
                        </div>
                    </div>
                </div>

                <div id="letsencryptData" class="collapse" aria-labelledby="letsencrypt" 
                    data-parent="#accordion">
                    <div class="card-body">
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">Certificate Kind</div>
                            <div class="col-2">
                                {{ getLetsEncryptCertificateKind() }}
                            </div>
                        </div>
                        <div class="row margin-2em">
                            <div class="col-2 text-align-right padding-right-1em">Issuer E-Mail</div>
                            <div class="col-4">
                                {{ letsencrypt.issuerEmail }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /letsencrypt -->

            <!-- Nodes -->
            <div class="card margin-1em">
                <div class="card-header" id="nodes">
                    <div class="row">
                        <div class="col">
                            <h5 class="mb-0">
                                <button class="btn btn-link accordion-link" data-toggle="collapse" data-target="#nodesData" 
                                    aria-expanded="false" aria-controls="nodesData">
                                    Nodes
                                </button>
                            </h5>
                        </div>
                        <div class="col-1">
                            <router-link to="/nodes" class="summaryLink">Edit</router-link>
                        </div>
                    </div>
                </div>

                <div id="nodesData" class="collapse" aria-labelledby="nodes" 
                    data-parent="#accordion">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-5">
                                <div class="row margin-1em"><div class="col"><strong>Masters</strong></div></div>
                                <div class="row margin-1em">
                                    <div class="col">Host</div>
                                    <div class="col-8">User</div>
                                </div>
                                <div class="row margin-1em" v-for="node in nodes.masters" :key="node.key">
                                    <div class="col">{{ node.host }}</div>
                                    <div class="col-8">{{ node.user }}</div>
                                </div>
                            </div>
                            <div class="col-6 offset-1-md">
                                <div class="row margin-1em">
                                    <div class="col"><strong>Workers</strong></div>
                                </div>
                                <div class="row margin-1em">
                                    <div class="col">Host</div>
                                    <div class="col-2">User</div>
                                    <div class="col-6">Workloads</div>
                                </div>
                                <div class="row margin-1em" v-for="node in nodes.workers" :key="node.key">
                                    <div class="col">{{ node.host }}</div>
                                    <div class="col-2">{{ node.user }}</div>
                                    <div class="col-6">{{ node.labels }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /Nodes -->

            <!-- Rook -->
            <div class="card margin-1em">
                <div class="card-header" id="rook">
                    <div class="row">
                        <div class="col">
                            <h5 class="mb-0">
                                <button class="btn btn-link accordion-link" data-toggle="collapse" data-target="#rookData" 
                                    aria-expanded="false" aria-controls="rookData">
                                    Rook
                                </button>
                            </h5>
                        </div>
                        <div class="col-1">
                            <router-link to="/rook" class="summaryLink">Edit</router-link>
                        </div>
                    </div>
                </div>

                <div id="rookData" class="collapse" aria-labelledby="rook" 
                    data-parent="#accordion">
                    <div class="card-body">
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">Rook Dashboard</div>
                            <div class="col-2">
                                <i v-if="rook.dashboard" class="fas fa-check-circle green"></i>
                                <i v-if="!rook.dashboard" class="fas fa-times-circle red"></i>
                            </div>
                            <div class="col-2 offset-md-2 text-align-right padding-right-1em">Replica Level</div>
                            <div class="col-2">{{ rook.replicaLevel }}</div>
                        </div>
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">Rook Monitoring</div>
                            <div class="col-2">
                                <i v-if="rook.monitoring" class="fas fa-check-circle green"></i>
                                <i v-if="!rook.monitoring" class="fas fa-times-circle red"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /rook -->

            <!-- Additional -->
            <div class="card margin-1em">
                <div class="card-header" id="additional">
                    <div class="row">
                        <div class="col">
                            <h5 class="mb-0">
                                <button class="btn btn-link accordion-link" data-toggle="collapse" data-target="#additionalData" 
                                    aria-expanded="false" aria-controls="additionalData">
                                    Additional Tools
                                </button>
                            </h5>
                        </div>
                        <div class="col-1">
                            <router-link to="/tools" class="summaryLink">Edit</router-link>
                        </div>
                    </div>
                </div>

                <div id="additionalData" class="collapse" aria-labelledby="additional" 
                    data-parent="#accordion">
                    <div class="card-body">
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">Harbor</div>
                            <div class="col-2">
                                <i v-if="additional.harbor" class="fas fa-check-circle green"></i>
                                <i v-if="!additional.harbor" class="fas fa-times-circle red"></i>
                            </div>
                            <div class="col-2 offset-md-2 text-align-right padding-right-1em">Prometheus</div>
                            <div class="col-2">
                                <i v-if="additional.prometheus" class="fas fa-check-circle green"></i>
                                <i v-if="!additional.prometheus" class="fas fa-times-circle red"></i>
                            </div>
                        </div>
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">Grafana</div>
                            <div class="col-2">
                                <i v-if="additional.grafana" class="fas fa-check-circle green"></i>
                                <i v-if="!additional.grafana" class="fas fa-times-circle red"></i>
                            </div>
                            <div class="col-2 offset-md-2 text-align-right padding-right-1em">Elasticsearch</div>
                            <div class="col-2">
                                <i v-if="additional.elastic" class="fas fa-check-circle green"></i>
                                <i v-if="!additional.elastic" class="fas fa-times-circle red"></i>
                            </div>
                        </div>
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">Kibana</div>
                            <div class="col-2">
                                <i v-if="additional.kibana" class="fas fa-check-circle green"></i>
                                <i v-if="!additional.kibana" class="fas fa-times-circle red"></i>
                            </div>
                            <div class="col-2 offset-md-2 text-align-right padding-right-1em">Fluentd</div>
                            <div class="col-2">
                                <i v-if="additional.fluentd" class="fas fa-check-circle green"></i>
                                <i v-if="!additional.fluentd" class="fas fa-times-circle red"></i>
                            </div>
                        </div>
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">Cert-Manager</div>
                            <div class="col-2">
                                <i v-if="additional.certmgr" class="fas fa-check-circle green"></i>
                                <i v-if="!additional.certmgr" class="fas fa-times-circle red"></i>
                            </div>
                            <div class="col-2 offset-md-2 text-align-right padding-right-1em">Kubernetes Dashboard</div>
                            <div class="col-2">
                                <i v-if="additional.dashboard" class="fas fa-check-circle green"></i>
                                <i v-if="!additional.dashboard" class="fas fa-times-circle red"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- /additional -->

            <!-- Complimentary -->
            <div class="card margin-1em">
                <div class="card-header" id="complimentary">
                    <div class="row">
                        <div class="col">
                            <h5 class="mb-0">
                                <button class="btn btn-link accordion-link" data-toggle="collapse" data-target="#complimentaryData" 
                                    aria-expanded="false" aria-controls="complimentaryData">
                                    Complimentary Tools
                                </button>
                            </h5>
                        </div>
                        <div class="col-1">
                            <router-link to="/complimentary" class="summaryLink">Edit</router-link>
                        </div>
                    </div>
                </div>


                <div id="complimentaryData" class="collapse" aria-labelledby="complimentary" 
                    data-parent="#accordion">
                    <div class="card-body">
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">Polyverse</div>
                            <div class="col-2">
                                <i v-if="complimentary.polyverse" class="fas fa-check-circle green"></i>
                                <i v-if="!complimentary.polyverse" class="fas fa-times-circle red"></i>
                            </div>
                            <div v-if="complimentary.polyverse" class="col-2 offset-md-2 text-align-right padding-right-1em">Polyverse Key</div>
                            <div v-if="complimentary.polyverse" class="col-2">
                                {{ complimentary.polyverseKey }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Subscription -->
            <div class="card margin-1em">
                <div class="card-header" id="subscription">
                    <div class="row">
                        <div class="col">
                            <h5 class="mb-0">
                                <button class="btn btn-link accordion-link" data-toggle="collapse" data-target="#subscriptionData" 
                                    aria-expanded="false" aria-controls="subscriptionData">
                                    Subscription
                                </button>
                            </h5>
                        </div>
                        <div class="col-1">
                            <router-link to="/subscription" class="summaryLink">Edit</router-link>
                        </div>
                    </div>
                </div>
                <div id="subscriptionData" class="collapse" aria-labelledby="subscription" 
                    data-parent="#accordion">
                    <div class="card-body">
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">Username</div>
                            <div class="col-2">
                                <span v-if="key !== ''">{{ key }} </span>
                                <span v-if="key == ''"><em>No Username entered</em></span>
                            </div>
                        </div>
                        <div class="row margin-1em">
                            <div class="col-2 text-align-right padding-right-1em">Password</div>
                            <div class="col-2">
                                <span v-if="password !== ''">*****</span>
                                <span v-if="password == ''"><em>No Password entered</em></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Constants from './js/constants.js'
import EventBus from './js/eventBus.js'
import Globals from './js/globals'

export default {
    name: 'summaryView',

    data: function() {
        return {
            general: {},
            nodes: {},
            cluster: {},
            rook: {},
            additional: {},
            key: '',
            password: '',
            letsencrypt: {},
            complimentary: {}
        }
    },

    methods: {

        // Adds a node to the list
        transformNode: function(list, item, isWorker, short) {
            var isShort = !(short === undefined || !short)

            var apps = []
            if(item.rook)
                apps[apps.length] = isShort ? "rook" : "Rook"
            var labels = isShort ? apps : apps.length > 0 ? apps.join(', ') : ''
            var role = isWorker ? 'W' : 'M'
            var key = role + list.length

            var node = {
                host: item.ip,
                user: item.user,
                role: role,
                labels: labels
            }

            if(!isShort)
                node.key = key
             
            list[list.length] = node
        },

        getLetsEncryptCertificateKind: function() {
            if(this.letsencrypt.issuer == 'letsencrypt-staging')
                return "Staging"

            return "Production"
        },

    },

    mounted : function () {
        // Notify about being loaded
        EventBus.$emit(Constants.Event_NewViewLoaded, {
            allowGoForward: false
        })

        // Set up the general settings
        this.general = {
            isHA: this.$store.state.installer.general.isHA,
            workers: this.$store.state.installer.general.workersList.length,
            masters: this.$store.state.installer.general.mastersList.length,
            installRook: this.$store.state.installer.general.installRook,
        }

        this.nodes = {
            masters: [],
            workers: []
        }

        // Transform and store the nodes
        this.$store.state.installer.general.mastersList.forEach(
            node => this.transformNode(this.nodes.masters, node, false))
        this.$store.state.installer.general.workersList.forEach(
            node => this.transformNode(this.nodes.workers, node, true))

        // Add the cluster settings
        this.cluster = this.$store.state.installer.cluster

        // Add the Rook settings
        this.rook = this.$store.state.installer.rook

        // Add the additionally to be installed applications
        this.additional = this.$store.state.installer.additional

        // Add the Harbor-Key
        this.key = this.$store.state.base.key
        this.password = this.$store.state.base.password

        // Complimentary
        this.complimentary = this.$store.state.installer.complimentary

        // Add the Let's Encrypt Data
        this.letsencrypt = this.$store.state.installer.letsencrypt
    },

    created: function() {
    }
}
</script>
